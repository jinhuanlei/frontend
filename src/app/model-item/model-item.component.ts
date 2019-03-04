import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

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

  constructor(private http: HttpClient, private router: Router) {
  }

  onLayerNumsChange(value: any) {
    this.layer_nums = value;
  }


  addFieldValue() {
    if (this.fieldArray.length <= 6) {
      this.fieldArray.push(this.newAttribute);
      this.newAttribute = {};
    }
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  onEditCloseItems() {
    this.isEditItems = !this.isEditItems;
    this.updateArray();
  }

  updateArray() {
    for (let i = 0, flag = true, len = this.fieldArray.length; i < len; flag ? i++ : i) {
      if (this.fieldArray[i] && this.fieldArray[i].val == null) {
        this.fieldArray.splice(i, 1);
        flag = false;
      } else {
        flag = true;
      }

    }
  }

  ngOnInit() {
    this.model = JSON.parse(sessionStorage.getItem('model'));
    console.log(this.model);
    // console.log(this.model['id']);
    this.http.get(this.baseUrl + 'visual/model/' + this.model.id + '/').subscribe(
      (data : any[]) => {
        for(let x = 0; x < data.length; x++){
          this.fieldArray.push({val : data[x].num_nets});
        }
        console.log(this.fieldArray)
        // for(const obj of data) {
        //   this.fieldArray.push(obj.num_nets);
        // }
      });
  }

  startTraining(){
    this.http.get(this.baseUrl + 'visual/training/' + this.model.id + '/').subscribe(
      data => {
        console.log(data)
      });
  }

  stopTraining(){
    this.http.get(this.baseUrl + 'visual/training/stop/' + this.model.id + '/').subscribe(
      data => {
        console.log(data)
      });
  }

}

interface Object {
  length: any;
}
