import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BizhawkViewComponent} from './bizhawk-view/bizhawk-view.component';
import {IndexComponent} from './index/index.component';
import {ModelListComponent} from './model-list/model-list.component';
import {CreateModelComponent} from './create-model/create-model.component';
import {LearningModeComponent} from './learning-mode/learning-mode.component';
import {ModelItemComponent} from './model-item/model-item.component';

const routes: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'bizhawkview', component: BizhawkViewComponent},
  {path: 'index', component: IndexComponent},
  {path: 'modellist', component: ModelListComponent},
  {path: 'createmodel', component: CreateModelComponent},
  {path: 'learningmode', component: LearningModeComponent},
  {path: 'modelitem', component: ModelItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
