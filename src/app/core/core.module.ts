import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MainOverlayComponent } from './main-overlay/main-overlay.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [
    MainOverlayComponent,
  ],
})
export class CoreModule { }
