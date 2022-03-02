import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { PlotlyModule } from 'angular-plotly.js';


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
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
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
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class ExternalModule { }
