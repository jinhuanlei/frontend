import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Subscription} from 'rxjs';
import {SocketService} from '../socket.service';

@Component({
  selector: 'app-model-item',
  templateUrl: './model-item.component.html',
  styleUrls: ['./model-item.component.css']
})
export class ModelItemComponent implements OnInit {
  fieldArray: Array<any> = [];
  newAttribute: any = {};
  isEditItems = false;
  layer_nums: any;
  baseUrl: string = environment.apiUrl;
  model: any = {id: '', model_name: '', model_duration: '', model_created: '', model_path: ''};
  wsSubscription: Subscription;
  status: any;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  traingHint = 'Training';
  validatingHint = 'Playing';
  isTraining = false;
  isValidating = false;
  loss_function = 'Mean Squared Error';
  sequenceLength = 50;
  batchSize = 5;
  dropOutRate = 0.5;
  public timePromise : any;
  constructor(private http: HttpClient, private router: Router, private wsService: SocketService) {
    this.wsSubscription = this.wsService.createObservableSocket('ws://localhost:8000/visual/ws/')
      .subscribe(
        data => {
          let obj: MyObj = JSON.parse(data.toString());
          console.log(obj);
        },
        err => console.log('err'),
        () => {
          console.log('The observable stream is complete');

        }
      );
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    return value;
  }

  validateModel() {
    // const message = {type: 'validateModel', id: this.model.id};
    // this.status = this.wsService.sendMessage(JSON.stringify(message));
    // // console.log(this.status);
    this.isValidating = true;
    this.http.get(this.baseUrl + 'visual/validating/' + this.model.id + '/').subscribe(
      data => {
        console.log(data);
        this.isValidating = false;
      });
  }

  stopValidating() {
    // const message = {type: 'stopValidating', id: this.model.id};
    // this.status = this.wsService.sendMessage(JSON.stringify(message));
    // console.log(this.status);
    this.validatingHint = 'Stopping';
    this.http.get(this.baseUrl + 'visual/validating/stop/' + this.model.id + '/').subscribe(
      data => {
        console.log(data);
      });
  }

  ngOnInit() {
    this.model = JSON.parse(sessionStorage.getItem('model'));
    console.log(this.model);
    // console.log(this.model['id']);
    this.http.get(this.baseUrl + 'visual/model/' + this.model.id + '/').subscribe(
      (data: any) => {
        let layers = data.layers;
        for (let x = 0; x < layers.length; x++) {
          this.fieldArray.push({val: layers[x].num_nets});
        }
        console.log(this.fieldArray);
        console.log(data.config);
        let configs : Configs = data.config[0];
        this.loss_function = configs.loss_function;
        this.sequenceLength = configs.sequence_length;
        this.batchSize = configs.batch_size;
        this.dropOutRate = configs.drop_out;
      });
  }

  startTraining() {
    this.traingHint = 'Training';
    this.isTraining = true;
    this.timer(1);
    this.http.get(this.baseUrl + 'visual/training/' + this.model.id + '/').subscribe(
      data => {
        console.log(data);
        this.isTraining = false;
      },
      error =>{
        console.log(error);
        this.isTraining = false;
        this.timer(-1);
      }
      );
  }

  stopTraining() {
    this.http.get(this.baseUrl + 'visual/training/stop/' + this.model.id + '/').subscribe(
      data => {
        console.log(data);
        console.log('Stop to model');
        this.timer(0);
        this.traingHint = 'Stopping';
      },
      error =>{
        console.log(error);
      });
  }

 second = 0;
  timer( flag ){      //flag是一个标识，何时计时和何时停止

    if( flag == 1){
        this.timePromise = setInterval(
            (success)=>{ //回掉函数开始计时了
                this.second++ ;
                //other actions
            },1000);
    }
    else if( flag == 0 ){
        //other actions
        //清除计时器
        window.clearInterval(this.timePromise);
        console.log("trained_period:" + this.second);
        const obj = {'training_period_inc':this.second};
        this.http.post(this.baseUrl + 'visual/trainedModel/'+this.model.id+'/', obj).subscribe(
      data => {
        console.log(data);
      }
    );
        this.second = 0;
    }else{
      window.clearInterval(this.timePromise);
      console.log("trained_period:" + this.second);
      this.second = 0;
    }
}


}

interface Object {
  length: any;
}

// export class Message {
//   constructor(
//     public message: string,
//   ) {
//   }
// }

interface MyObj {
  message: string;
  data: string;
}

interface Configs{
  id: number;
  num_passes: number;
  model_id:number;
  loss_function:string;
  sequence_length:number;
  batch_size:number;
  recur_button:boolean;
  drop_out:number;
  max_grad:number;
  variational_recurrent:boolean;
}
