import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subscription} from 'rxjs';
import {SocketService} from '../socket.service';


@Component({
  selector: 'app-bizhawk-view',
  templateUrl: './bizhawk-view.component.html',
  styleUrls: ['./bizhawk-view.component.css'],
  providers: []
})


export class BizhawkViewComponent implements OnInit {

  baseUrl: string = environment.apiUrl;
  curTime: any = 0;
  visualImage: any = 'Ready to connecting...';
  ioConnection: any;
  messageContent: string;
  wsSubscription: Subscription;
  status: any;
  activated = false;
  cursorStatus = 'pointer';

  constructor(private http: HttpClient, private wsService: SocketService) {
    this.wsSubscription = this.wsService.createObservableSocket('ws://localhost:8000/visual/ws/')
      .subscribe(
        data => {
          const obj: MyObj = JSON.parse(data.toString());
          if (obj.data == null) {
            this.visualImage += '\r' + obj.message;
          } else {
            this.visualImage = obj.data;
          }
        },
        err => console.log('err'),
        () => {
          console.log('The observable stream is complete');
          this.activated = false;
          this.cursorStatus = 'pointer';
        }
      );
  }


  testFunc(): void {
    this.http.get(this.baseUrl + 'visual/testFunc/').subscribe(
      // data => {
      //   this.curTime = data;
      // }
    );
  }

  testDB(): void {
    this.http.get(this.baseUrl + 'visual/testDB/').subscribe(
      // data => {
      //   this.curTime = data;
      // }
    );
  }

  connect() {
    const message = 'OK';
    this.status = this.wsService.sendMessage(message);
    this.activated = true;
    this.cursorStatus = 'not-allowed';
    console.log(status);
  }


  ngOnInit(): void {
  }

}

export class Message {
  constructor(
    public message: string,
  ) {
  }
}

interface MyObj {
  message: string;
  data: string;
}


