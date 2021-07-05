import { DirectivesModule } from './../../directives/directives.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadeiaProdutivaComponent } from './cadeia-produtiva.component';
import { MetodosSeparacaoComponent } from './metodos-separacao/metodos-separacao.component';
import { TeoriaSxComponent } from './teoria-sx/teoria-sx.component';
import { TendenciasComponent } from './tendencias/tendencias.component';

const cadeiaProdutivaRoutes: Routes = [
  {
    path: 'cadeia-produtiva', component: CadeiaProdutivaComponent,
    children: [
      { path: 'metodos-separacao', component: MetodosSeparacaoComponent },
      { path: 'tendencias', component: TendenciasComponent },
      { path: 'teoria-sx', component: TeoriaSxComponent },
    ]
  }
];

@NgModule({
  declarations: [
    MetodosSeparacaoComponent,
    TendenciasComponent,
    TeoriaSxComponent,
    CadeiaProdutivaComponent,
  ],
  imports: [
    RouterModule.forChild(cadeiaProdutivaRoutes),
    CommonModule,
    DirectivesModule
  ],
  exports: [
    RouterModule
  ]
})

export class CadeiaProdutivaModule { }
