import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BizhawkViewComponent} from './bizhawk-view/bizhawk-view.component';
import {AppRoutingModule} from './app-routing.module';
import {IndexComponent} from './index/index.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatTableModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { TestComponent } from './test/test.component';
import {SocketService} from './socket.service';
import { ModelListComponent } from './model-list/model-list.component';
import { CreateModelComponent } from './create-model/create-model.component';
@NgModule({
  declarations: [
    AppComponent,
    BizhawkViewComponent,
    IndexComponent,
    TestComponent,
    ModelListComponent,
    CreateModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatTableModule
  ],
  providers: [HttpClientModule, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
