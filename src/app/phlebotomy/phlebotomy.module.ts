import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhlebotomyRoutingModule } from './phlebotomy-routing.module';
import { CardTableComponent } from './card-table/card-table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    PhlebotomyRoutingModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class PhlebotomyModule { }
