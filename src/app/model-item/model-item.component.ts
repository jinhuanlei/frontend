import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-model-item',
  templateUrl: './model-item.component.html',
  styleUrls: ['./model-item.component.css']
})
export class ModelItemComponent implements OnInit {
  fieldArray: Array<any> = [];
  newAttribute: any = {};
  isEditItems: boolean;
  layer_nums: any;

  constructor() {
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
  }

}
