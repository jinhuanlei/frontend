import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {WebSocketSubject} from 'rxjs/websocket';
import { Observable } from 'rxjs';
import {SocketService} from '../socket.service';
import {Subscription} from "rxjs";


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
  messages: Message[] = [];
  messageContent: string;
  wsSubscription: Subscription;
  status;
  constructor(private http: HttpClient, private wsService: SocketService) {
     this.wsSubscription = this.wsService.createObservableSocket('ws://localhost:8000/visual/ws/')
      .subscribe(
        data => this.visualImage = data,
        err => console.log( 'err'),
        () =>  console.log( 'The observable stream is complete')
      );
  }


  getCurTime(): void {
    this.http.get(this.baseUrl + 'visual/time/').subscribe(
      data => {
        this.curTime = data;
      }
    );
  }

  connect() {
    const message = 'OK';
     this.status = this.wsService.sendMessage(message);
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




