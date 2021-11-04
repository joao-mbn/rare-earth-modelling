import { NgModule } from '@angular/core';
import { PlotlyModule } from 'angular-plotly.js';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MtxSliderModule } from '@ng-matero/extensions/slider';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatSliderModule,
    MtxSliderModule,
    PlotlyModule
  ],
  exports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatSliderModule,
    MtxSliderModule,
    PlotlyModule
  ]
})
export class ExternalModule { }
