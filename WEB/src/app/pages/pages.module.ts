import { SimulationsComponent } from './simulations/simulations.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalModule } from '../external.module';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    SimulationsComponent
  ],
  imports: [
    CommonModule,
    ExternalModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    SimulationsComponent
  ]
})
export class PagesModule { }
