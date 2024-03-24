import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { SampleRegistrationComponent } from './components/sample-registration/sample-registration.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectFilterModule } from 'mat-select-filter';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu'; // Import MatMenuModule
import { MatTooltipModule } from '@angular/material/tooltip';
import { HistologyFormComponent } from './components/histology-form/histology-form.component';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [
    SampleRegistrationComponent,
    HistologyFormComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatTooltipModule,
    MatChipsModule
  ]
})
export class RegistrationModule { }

