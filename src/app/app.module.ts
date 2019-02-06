import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BizhawkViewComponent} from './bizhawk-view/bizhawk-view.component';
import {AppRoutingModule} from './app-routing.module';
import {IndexComponent} from './index/index.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatTableModule, MatSelectModule } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {SocketService} from './socket.service';
import { ModelListComponent } from './model-list/model-list.component';
import { CreateModelComponent } from './create-model/create-model.component';
import { QuickStartComponent } from './quick-start/quick-start.component';
@NgModule({
  declarations: [
    AppComponent,
    BizhawkViewComponent,
    IndexComponent,
    ModelListComponent,
    CreateModelComponent,
    QuickStartComponent,
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
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [HttpClientModule, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
