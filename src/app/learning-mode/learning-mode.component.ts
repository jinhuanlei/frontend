import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-learning-mode',
  templateUrl: './learning-mode.component.html',
  styleUrls: ['./learning-mode.component.css']
})
export class LearningModeComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  baseUrl: string = environment.apiUrl;

  ngOnInit() {
  }

  quickStart() {
    this.http.get(this.baseUrl + 'visual/quickstart/').subscribe(
      data => {

      });
  }
}
