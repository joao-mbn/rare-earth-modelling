import { NgModule } from '@angular/core';
import { PlotlyModule } from 'angular-plotly.js';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PlotlyModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
    MatExpansionModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
  ],
  exports: [
    CommonModule,
    PlotlyModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
    MatExpansionModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
  ]
})
export class ExternalModule { }
