import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { AuthGuard } from './services/auth/auth.guard';
import { RegistrationComponent } from './registration/registration.component';
import { DemographicComponent } from './registration/demographic/demographic.component';
import { ClinicalHistoryComponent } from './registration/clinical-history/clinical-history.component';
import { AttachDocumentComponent } from './registration/attach-document/attach-document.component';
import { ConsentFormComponent } from './registration/consent-form/consent-form.component';
import { PhlebotomyComponent } from './phlebotomy/phlebotomy.component';
// import { HistologyComponent } from './histology/histology.component';


export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      // {
      //   path: 'material',
      //   loadChildren:
      //     () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      // },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'authentication',
        loadChildren: () => import('./authentication/authentication.module').then(module => module.AuthenticationModule)
      },
      {
        path: 'registration',
        loadChildren: () => import('./registration/registration.module').then(module => module.RegistrationModule)
      },
      {
        path: 'phlebotomy',
        component: PhlebotomyComponent
      },
      // {
      //   path: 'histology',
      //   component: HistologyComponent
      //   // loadChildren: () => import('./histology/histology.module').then(module => module.HistologyModule)
      // },


      // {
      //   path: "sample",
      //   component: SampleComponent,
      //   children: [
      //     { path: "status", component: StatusComponent },
      //     { path: "biobank", component: BiobankComponent },
      //     { path: "registeration-s", component: RegisterationSComponent },
      //     { path: "request", component: RequestComponent },
      //     { path: "", redirectTo: "status", pathMatch: "full" },
      //   ],
      // },
      // // Sample Management views
      // {
      //   path: 'sample',
      //   component: SampleComponent,
      //   children: [
      //     // { path: 'sample-request', component: SampleRequestComponent },
      //     // { path: 'sample-registration', component: SampleRegistrationComponent },
      //     // { path: 'sample-status', component: SampleStatusComponent },
      //     // { path: 'sample-biobanking', component: SampleBiobankingComponent },
      //     // { path: 'phlebotomy', component: PhlebotomyComponent },
      //     // Add more sample management routes here
      //     { path: '', redirectTo: 'sample-request', pathMatch: 'full' },
      //   ],
      // },
      // // Histology views
      // {
      //   path: 'histology',
      //   component: HistologyComponent,
      //   children: [
      //     // { path: 'sample-status', component: HistologySampleStatusComponent },
      //     // { path: 'sample-acknowledgement', component: HistologySampleAcknowledgementComponent },
      //     // { path: 'sample-unacknowledged', component: HistologySampleUnacknowledgedComponent },
      //     // // Add more histology routes here
      //     { path: '', redirectTo: 'sample-status', pathMatch: 'full' },
      //   ],
      // },
      // // Specimen Management views
      // // Add specimen management routes here
      // // Inventory views
      // // Add inventory routes here
      // // Reporting views
      // {
      //   path: 'report',
      //   component: ReportComponent,
      //   children: [
      //     // { path: 'dashboard-report', component: DashboardReportComponent },
      //     // { path: 'report-spooler', component: ReportSpoolerComponent },
      //     // Add more reporting routes here
      //     { path: '', redirectTo: 'dashboard-report', pathMatch: 'full' },
      //   ],
      // },
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./authentication/auth-signin/auth-signin.module').then(module => module.AuthSigninModule)
      },
      {
        path: 'authe',
        loadChildren: () => import('./authentication/authentication.module').then(module => module.AuthenticationModule)
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }