import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PhlebotomyComponent } from './phlebotomy.component';



const routes: Routes = [
  {
    path: 'r',
    component: PhlebotomyComponent,
    children: [


      { path: 'status', loadChildren: () => import('./status/status.module').then(module => module.StatusModule) },
      { path: 'sample-registration', loadChildren: () => import('./sample-registration/sample-registration.module').then(module => module.SampleRegistrationModule) },
      { path: 'collection', loadChildren: () => import('./collection/collection.module').then(module => module.CollectionModule) },
      { path: 'dispatch', loadChildren: () => import('./dispatch/dispatch.module').then(module => module.DispatchModule) },





    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PhlebotomyRoutingModule { }










