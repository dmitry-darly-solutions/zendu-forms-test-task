import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainOverlayComponent } from './core/main-overlay/main-overlay.component';

const routes: Routes = [
  {
    path: '',
    component: MainOverlayComponent,
    children: [
      {
        path: 'forms',
        loadChildren: () => import('./pages/forms/forms.module').then(m => m.FormsModule),
      },
      {
        path: 'customers',
        loadChildren: () => import('./pages/customers/customers.module').then(m => m.CustomersModule),
      },
      {
        path: 'submissions',
        loadChildren: () => import('./pages/submissions/submissions.module').then(m => m.SubmissionsModule),
      },
      {
        path: 'history',
        loadChildren: () => import('./pages/history/history.module').then(m => m.HistoryModule),
      },
      {
        path: 'reports',
        loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule),
      },
      {
        path: 'workflow',
        loadChildren: () => import('./pages/workflow/workflow.module').then(m => m.WorkflowModule),
      },
      {
        path: '',
        redirectTo: 'submissions',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
