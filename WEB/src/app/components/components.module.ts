import { ExternalModule } from './../external.module';
import { ModalConfigurationComponent } from './modal-configuration/modal-configuration.component';
import { PanelOperationComponent } from './panel-operation/panel-operation.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ButtonComponent } from './button/button.component';
import { SliderComponent } from './slider/slider.component';
import { MatRangeSliderComponent } from './range-slider/mat-range-slider.component';
import { SummaryComponent } from './summary/summary.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesModule } from '../services/services.module';

@NgModule({
  declarations: [
    ButtonComponent,
    DropdownComponent,
    PanelOperationComponent,
    ModalConfigurationComponent,
    SliderComponent,
    MatRangeSliderComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    ExternalModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule
  ],
  exports: [
    ButtonComponent,
    DropdownComponent,
    PanelOperationComponent,
    ModalConfigurationComponent
  ]
})
export class ComponentsModule { }
