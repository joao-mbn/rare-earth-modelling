import { ExternalModule } from './../external.module';
import { PopUpProjectConfigurationComponent } from './pop-up-project-configuration/pop-up-project-configuration.component';
import { PanelOperationComponent } from './panel-operation/panel-operation.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ButtonComponent } from './button/button.component';
import { SliderComponent } from './slider/slider.component';
import { MatRangeSliderComponent } from './range-slider/mat-range-slider.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ButtonComponent,
    DropdownComponent,
    PanelOperationComponent,
    PopUpProjectConfigurationComponent,
    SliderComponent,
    MatRangeSliderComponent
  ],
  imports: [
    CommonModule,
    ExternalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ButtonComponent,
    DropdownComponent,
    PanelOperationComponent,
    PopUpProjectConfigurationComponent
  ]
})
export class ComponentsModule { }
