import { PopUpProjectConfigurationComponent } from './pop-up-project-configuration/pop-up-project-configuration.component';
import { PannelOperationComponent } from './pannel-operation/pannel-operation.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ButtonSaveComponent } from './button-save/button-save.component';
import { ButtonRunComponent } from './button-run/button-run.component';
import { ButtonCreateNewProjectComponent } from './button-create-new-project/button-create-new-project.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ButtonCreateNewProjectComponent,
    ButtonRunComponent,
    ButtonSaveComponent,
    DropdownComponent,
    PannelOperationComponent,
    PopUpProjectConfigurationComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonCreateNewProjectComponent,
    ButtonRunComponent,
    ButtonSaveComponent,
    DropdownComponent,
    PannelOperationComponent,
    PopUpProjectConfigurationComponent
  ]
})
export class ComponentsModule { }
