import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ConsentFormComponent } from './consent-form.component';

const routes: Routes = [
  {
    path: '',
    component: ConsentFormComponent
  }
];




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ConsentFormRoutingModule { }
