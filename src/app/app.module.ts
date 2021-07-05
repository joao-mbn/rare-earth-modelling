import { AppComponent } from './app.component';
import { HistoriaComponent } from './pages/historia/historia.component';
import { CenarioMundialComponent } from './pages/cenario-mundial/cenario-mundial.component';
import { AplicacoesComponent } from './pages/aplicacoes/aplicacoes.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CadeiaProdutivaModule } from './pages/cadeia-produtiva/cadeia-produtiva.module';
import { TrabalhoCetemModule } from './pages/trabalho-cetem/trabalho-cetem.module';
import { TabelaPeriodicaModule } from './pages/tabela-periodica/tabela-periodica.module';
import { DirectivesModule } from './directives/directives.module';

import { SimulacoesService } from './services/simulacoes.service';
@NgModule({
  declarations: [
    AppComponent,
    AplicacoesComponent,
    CenarioMundialComponent,
    HistoriaComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    CadeiaProdutivaModule,
    TrabalhoCetemModule,
    TabelaPeriodicaModule,
    DirectivesModule,
    AppRoutingModule,
  ],
  providers: [SimulacoesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
