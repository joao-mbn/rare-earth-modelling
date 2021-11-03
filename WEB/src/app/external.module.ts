import { NgModule } from '@angular/core';
import { PlotlyModule } from 'angular-plotly.js';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    PlotlyModule
  ],
  exports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    PlotlyModule
  ]
})
export class ExternalModule { }
