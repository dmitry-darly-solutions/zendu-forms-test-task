import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbAlertModule, NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { SubmissionsComponent } from './submissions.component';
import { ListComponent } from './components/list/list.component';
import { MapComponent } from './components/map/map.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SubmissionsComponent,
    ListComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbAlertModule,
    FormsModule,
    RouterModule.forChild([
        {
          path: '',
          component: SubmissionsComponent,
          children: [
            {
              path: 'list',
              component: ListComponent,
            },
            {
              path: 'map',
              component: MapComponent,
            },
            {
              path: '',
              redirectTo: 'list',
              pathMatch: 'full',
            },
          ],
        },
      ],
    ),
  ],
})
export class SubmissionsModule {
}
