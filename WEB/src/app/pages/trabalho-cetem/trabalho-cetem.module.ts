import { ResultadosComponent } from './resultados/resultados.component';
import { SimulacoesComponent } from './simulacoes/simulacoes.component';
import { ViabilidadeEconomicaComponent } from './viabilidade-economica/viabilidade-economica.component';
import { FuturoComponent } from './futuro/futuro.component';
import { TrabalhoCetemComponent } from './trabalho-cetem.component';

import { PlotlyModule } from 'angular-plotly.js';
import { DirectivesModule } from './../../directives/directives.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SimulationsService } from './../../services/simulacoes.service';

const cetemRoutes: Routes = [
  {
    path: 'trabalho-cetem', component: TrabalhoCetemComponent,
    children: [
      { path: 'futuro', component: FuturoComponent },
      { path: 'resultados', component: ResultadosComponent },
      { path: 'simulacoes', component: SimulacoesComponent },
      { path: 'viabilidade-economica', component: ViabilidadeEconomicaComponent },
    ]
  },
];

@NgModule({
  declarations: [
    FuturoComponent,
    ResultadosComponent,
    SimulacoesComponent,
    ViabilidadeEconomicaComponent,
    TrabalhoCetemComponent,
  ],
  imports: [
    RouterModule.forChild(cetemRoutes),
    CommonModule,
    DirectivesModule,
    HttpClientModule,
    PlotlyModule,
  ],
  exports: [RouterModule],
  providers: [SimulationsService],
})

export class TrabalhoCetemModule { }
