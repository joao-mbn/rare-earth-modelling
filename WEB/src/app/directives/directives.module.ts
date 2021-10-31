import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodicTableButtonDirective } from './periodic-table-button.directive';

@NgModule({
  declarations: [
    PeriodicTableButtonDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PeriodicTableButtonDirective,
  ]
})
export class DirectivesModule { }
