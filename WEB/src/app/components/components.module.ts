import { PopUpProjectConfigurationComponent } from './pop-up-project-configuration/pop-up-project-configuration.component';
import { PannelOperationComponent } from './pannel-operation/pannel-operation.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ButtonComponent } from './button/button.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ButtonComponent,
    DropdownComponent,
    PannelOperationComponent,
    PopUpProjectConfigurationComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonComponent,
    DropdownComponent,
    PannelOperationComponent,
    PopUpProjectConfigurationComponent
  ]
})
export class ComponentsModule { }
