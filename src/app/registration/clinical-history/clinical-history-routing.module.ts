import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClinicalHistoryComponent } from './clinical-history.component';

const routes: Routes = [
  {
    path: '',
    component: ClinicalHistoryComponent
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
export class ClinicalHistoryRoutingModule { }
