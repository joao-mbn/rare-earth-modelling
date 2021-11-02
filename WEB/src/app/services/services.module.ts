import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectService } from './project.service';
import { IsothermService } from './isotherm.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    IsothermService,
    ProjectService
  ]
})
export class ServicesModule { }
