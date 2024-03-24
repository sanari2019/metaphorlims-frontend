import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AttachDocumentComponent } from './attach-document.component';

const routes: Routes = [
  {
    path: '',
    component: AttachDocumentComponent
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
export class AttachDocumentRoutingModule { }
