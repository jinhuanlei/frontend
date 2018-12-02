import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-bizhawk-view',
  templateUrl: './bizhawk-view.component.html',
  styleUrls: ['./bizhawk-view.component.css']
})
export class BizhawkViewComponent implements OnInit {

  constructor(private http : HttpClient) {}
  curTime : any = 0;
  ngOnInit() {
  }

  getCurTime(): void {
    this.http.get("/visualnn/api/v1/time").subscribe(
      data => {
        this.curTime = data;
      }
    )
  }

}
