
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { AuthComponent } from './layouts/auth/auth.component';

import { RegistrationNavbarComponent } from './registration/components/registration-navbar/registration-navbar.component';
// import { AdministrationNavbarComponent } from './components/navbars/administration-navbar/administration-navbar.component';
// import { SampleNavbarComponent } from './components/navbars/sample-navbar/sample-navbar.component';
// import { SpecimenNavbarComponent } from './components/navbars/specimen-navbar/specimen-navbar.component';
// import { InventoryNavbarComponent } from './components/navbars/inventory-navbar/inventory-navbar.component';
// import { ReportNavbarComponent } from './components/navbars/report-navbar/report-navbar.component';
import { RegistrationComponent } from './registration/registration.component';
// import { AdministrationComponent } from './layouts/administration/administration.component';
// import { SampleComponent } from './layouts/sample/sample.component';
// import { SpecimenComponent } from './layouts/specimen/specimen.component';
// import { InventoryComponent } from './layouts/inventory/inventory.component';
// import { ReportComponent } from './layouts/report/report.component';
// import { HistologyComponent } from './layouts/histology/histology.component';
// import { HistologyNavbarComponent } from './components/navbars/histology-navbar/histology-navbar.component';
import { HeaderRegistrationComponent } from './registration/components/header-registration/header-registration.component';
// import { HeaderFilterComponent } from './components/headers/header-filter/header-filter.component';
import { DemographicComponent } from './registration/demographic/demographic.component';
import { AttachDocumentComponent } from './registration/attach-document/attach-document.component';
import { ConsentFormComponent } from './registration/consent-form/consent-form.component';
import { ClinicalHistoryComponent } from './registration/clinical-history/clinical-history.component';
// import { RequestComponent } from './sample/request/request.component';
// import { RegisterationSComponent } from './sample/registeration-s/registeration-s.component';
import { PhlebotomyComponent } from './phlebotomy/phlebotomy.component';
// import { BiobankComponent } from './sample/biobank/biobank.component';
// import { StatusComponent } from './sample/status/status.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CardTableComponent } from './phlebotomy/card-table/card-table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { SampleDetailComponent } from './phlebotomy/sample-detail/sample-detail.component';
// import { SpecimenComponent } from './specimen/specimen.component';
// // import { HistologyComponent } from './histology/histology.component';
// import { HistologyRoutingModule } from './histology/histology-routing.module';
// import { HistologyModule } from './histology/histology.module';
// import { AcknowledgeModule } from './histology/acknowledge/acknowledge.module';
// import { UnacknowledgeModule } from './histology/unacknowledge/unacknowledge.module';
import { SampleDetailService } from './services/sample-detail.service';
// import { AcknowledgeComponent } from './histology/acknowledge/acknowledge.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';




@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    AuthComponent,
    DemographicComponent,
    AttachDocumentComponent,
    ConsentFormComponent,
    ClinicalHistoryComponent,
    CardTableComponent,
    // RequestComponent,
    // RegisterationSComponent,
    PhlebotomyComponent,
    // BiobankComponent,
    // StatusComponent,
    RegistrationComponent,
    HeaderRegistrationComponent,
    RegistrationNavbarComponent,
    SampleDetailComponent,
    // SpecimenComponent,
    // HistologyComponent,
    // AcknowledgeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    CKEditorModule,
    NgxDaterangepickerMd.forRoot({
      applyLabel: 'Okay',
      firstDay: 0
    }),
    RouterModule.forRoot(AppRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        allowedDomains: ['https://localhost:7210', 'http://localhost:5000'], // replace with your Auth0 domain
        disallowedRoutes: ['/auth/login'], // replace with your unauthorized route
      },
    }),
    // HistologyRoutingModule,
    // HistologyModule,
    // AcknowledgeModule,
    // UnacknowledgeModule,
  ],
  exports: [JwtModule],
  providers: [
    SampleDetailService,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
