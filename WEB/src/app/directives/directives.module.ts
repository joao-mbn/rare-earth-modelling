import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoremDirective } from './lorem.directive';
import { PeriodicTableButtonDirective } from './periodic-table-button.directive';
import { ShowboxDirective } from './showbox.directive';

@NgModule({
  declarations: [
    LoremDirective,
    ShowboxDirective,
    PeriodicTableButtonDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoremDirective,
    ShowboxDirective,
    PeriodicTableButtonDirective,
  ]
})
export class DirectivesModule { }
