import {Component, OnInit} from '@angular/core';

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
    myDataArray = ELEMENT_DATA;
  constructor() {}


  ngOnInit() {
  }
}
