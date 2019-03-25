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
  traingHint = "Training"
  isTraining = false;
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

  validateModel() {
    // const message = {type: 'validateModel', id: this.model.id};
    // this.status = this.wsService.sendMessage(JSON.stringify(message));
    // // console.log(this.status);
    this.http.get(this.baseUrl + 'visual/validating/' + this.model.id + '/').subscribe(
      data => {
        console.log(data);
      });
  }

  stopValidating() {
    // const message = {type: 'stopValidating', id: this.model.id};
    // this.status = this.wsService.sendMessage(JSON.stringify(message));
    // console.log(this.status);
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
      (data: any[]) => {
        for (let x = 0; x < data.length; x++) {
          this.fieldArray.push({val: data[x].num_nets});
        }
        console.log(this.fieldArray);
        // for(const obj of data) {
        //   this.fieldArray.push(obj.num_nets);
        // }
      });
  }

  startTraining() {
    this.traingHint = "Training";
    this.isTraining = true;
    this.http.get(this.baseUrl + 'visual/training/' + this.model.id + '/').subscribe(
      data => {
        console.log(data);
        this.isTraining = false;
      });
  }

  stopTraining() {
    this.http.get(this.baseUrl + 'visual/training/stop/' + this.model.id + '/').subscribe(
      data => {
        console.log(data);
        console.log('Stop to model');
        this.traingHint = "Stoping";
      });
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
