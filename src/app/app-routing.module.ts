import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BizhawkViewComponent} from './bizhawk-view/bizhawk-view.component';
import {IndexComponent} from './index/index.component';
import {ModelListComponent} from './model-list/model-list.component';
import {CreateModelComponent} from './create-model/create-model.component';
import {QuickStartComponent} from './quick-start/quick-start.component';

const routes: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'bizhawkview', component: BizhawkViewComponent},
  {path: 'index', component: IndexComponent},
  {path: 'modellist', component: ModelListComponent},
  {path: 'createmodel', component: CreateModelComponent},
  {path: 'quickstart', component: QuickStartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
