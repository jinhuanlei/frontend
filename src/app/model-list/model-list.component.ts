import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  id: string;
  name: string;
  period: string;
}


@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {
  displayedColumns: string[] = ['modelId', 'modelName', 'modelPeriod', 'operation'];
  myDataArray = new MatTableDataSource<Model>();
  baseUrl: string = environment.apiUrl;
  modelData : any;
  constructor(private http: HttpClient, private router: Router) {
  }


  ngOnInit() {
    this.http.get(this.baseUrl + 'visual/models/').subscribe(
      (data : Model[]) => {
        // this.myDataArray = data;
        this.myDataArray = new MatTableDataSource<Model>(data);
        this.modelData = data;
        console.log(data);
      });
  }

  selectRow(obj) {
    sessionStorage.setItem('model', JSON.stringify(obj));
    this.router.navigateByUrl('modelitem');
  }

  deleteModel(obj) {
    console.log(obj);
    this.http.get(this.baseUrl + 'visual/model/delete/' + obj.id + '/').subscribe(
      (data) => {
        console.log(data);
        for (let x = 0; x < this.modelData.length; x++) {
          if (this.modelData[x].id == Number(data)) {
            console.log('delete');
            this.modelData.splice(x, 1);
            this.myDataArray = new MatTableDataSource<Model>(this.modelData);
          }
        }
      },
      error => {
        console.log('delete fails');
      }
    );
  }

}
export interface Model {
  id: string;
  model_name: string;
  model_duration : string;
}
