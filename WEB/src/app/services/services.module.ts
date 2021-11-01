import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectService } from './project.service';
import { SimulationsService } from './simulations.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SimulationsService,
    ProjectService
  ]
})
export class ServicesModule { }
