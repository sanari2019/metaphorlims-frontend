import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration.component';







const routes: Routes = [
  {
    path: 'r',
    component: RegistrationComponent,
    children: [


      { path: 'demographic', loadChildren: () => import('./demographic/demographic.module').then(module => module.DemographicModule) },
      { path: 'attach-file', loadChildren: () => import('./attach-document/attach-document.module').then(module => module.AttachDocumentModule) },
      { path: 'clinical-history', loadChildren: () => import('./clinical-history/clinical-history.module').then(module => module.ClinicalHistoryModule) },
      { path: 'consent-form', loadChildren: () => import('./consent-form/consent-form.module').then(module => module.ConsentFormModule) },




    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
