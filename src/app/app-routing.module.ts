import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BizhawkViewComponent} from './bizhawk-view/bizhawk-view.component';
import {IndexComponent} from './index/index.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'bizhawkview', component: BizhawkViewComponent },
  { path: 'index', component: IndexComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
