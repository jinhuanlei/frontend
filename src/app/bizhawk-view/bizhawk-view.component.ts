import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-bizhawk-view',
  templateUrl: './bizhawk-view.component.html',
  styleUrls: ['./bizhawk-view.component.css']
})
export class BizhawkViewComponent implements OnInit {

  constructor(private http: HttpClient) {}
  baseUrl: string = environment.apiUrl;
  curTime: any = 0;
  ngOnInit() {
  }

  getCurTime(): void {
    this.http.get(this.baseUrl + 'visual/time/').subscribe(
      data => {
        this.curTime = data;
      }
    );
  }

}
