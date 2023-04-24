import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WorkflowComponent } from './workflow.component';

@NgModule({
  declarations: [
    WorkflowComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
          path: '',
          component: WorkflowComponent,
        },
      ],
    ),
  ],
})
export class WorkflowModule { }
