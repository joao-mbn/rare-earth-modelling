import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ServicesModule } from './services/services.module';
import { DirectivesModule } from './directives/directives.module';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    DirectivesModule,
    ComponentsModule,
    PagesModule
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
