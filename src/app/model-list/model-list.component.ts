import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

export interface PeriodicElement {
  id: string;
  name: string;
  period: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: '1', name: 'Hydrogen', period: '1.0079'},
  {id: '2', name: 'Helium', period: '4.0026'},
  {id: '3', name: 'Lithium', period: '6.941'},

];

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {
  displayedColumns: string[] = ['modelId', 'modelName', 'modelPeriod'];
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
    console.log(obj);
  }

}
