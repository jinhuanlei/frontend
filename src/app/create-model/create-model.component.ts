import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-model',
  templateUrl: './create-model.component.html',
  styleUrls: ['./create-model.component.css']
})
export class CreateModelComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {
  }

  baseUrl: string = environment.apiUrl;
  fieldArray: Array<any> = [];
  newAttribute: any = {};
  modelName: any;
  firstField = true;
  firstFieldName = 'First Item name';
  isEditItems: boolean;
  loss_function = 'Mean Squared Error';
  sequenceLength = 50;
  batchSize = 5;
  dropOutRate = 0.5;
  trainging_set = 'Default';

  ngOnInit() {
  }


  onTrainingSetChange(value: any) {
    this.trainging_set = value;

  }

  onLossFunctionChange(value: any) {
    this.loss_function = value;
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    return value;
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
    this.updateArray();
    this.isEditItems = !this.isEditItems;
    console.log(this.fieldArray);
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

  submitForm() {
    const formJson = {
      'model_name': this.modelName,
      'layers': this.fieldArray,
      'lossFunction': this.loss_function,
      'sequenceLength': this.sequenceLength,
      'batchSize': this.batchSize,
      'dropOut': this.dropOutRate,
      'trainingSet':this.trainging_set
    };
    this.http.post(this.baseUrl + 'visual/createModel/', formJson).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('modellist');
      }
    );
  }

}
