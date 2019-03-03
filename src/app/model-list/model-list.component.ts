import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

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
  myDataArray: any;
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {
  }


  ngOnInit() {
    this.http.get(this.baseUrl + 'visual/models/').subscribe(
      data => {
        this.myDataArray = data;
      });
  }

  selectRow(obj) {
    sessionStorage.setItem('model', JSON.stringify(obj));
    this.router.navigateByUrl('modelitem');
  }

}
