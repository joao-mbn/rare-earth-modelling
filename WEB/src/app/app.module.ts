import { SimulationsComponent } from './pages/simulations/simulations.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';

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

import { SimulationsService } from './services/simulations.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SimulationsComponent
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
    MatTabsModule
  ],
  bootstrap: [AppComponent],
  providers: [SimulationsService]
})

export class AppModule { }
