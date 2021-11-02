import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { PlotlyModule } from 'angular-plotly.js';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    PlotlyModule
  ],
  exports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    PlotlyModule
  ]
})
export class ExternalModule { }
