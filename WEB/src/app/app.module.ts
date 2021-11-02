import { SimulationsComponent } from './pages/simulations/simulations.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';

import { ButtonSaveComponent } from './components/button-save/button-save.component';
import { ButtonRunComponent } from './components/button-run/button-run.component';
import { PopUpProjectConfigurationComponent } from './components/pop-up-project-configuration/pop-up-project-configuration.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { PannelOperationComponent } from './components/pannel-operation/pannel-operation.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { DirectivesModule } from './directives/directives.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { PlotlyModule } from 'angular-plotly.js';
import { ServicesModule } from './services/services.module';
import { ButtonCreateNewProjectComponent } from './components/button-create-new-project/button-create-new-project.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SimulationsComponent,
    ButtonSaveComponent,
    ButtonRunComponent,
    PopUpProjectConfigurationComponent,
    DropdownComponent,
    PannelOperationComponent,
    ButtonCreateNewProjectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    DirectivesModule,
    AppRoutingModule,
    PlotlyModule,
    MatTableModule,
    MatTabsModule,
    ServicesModule
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
