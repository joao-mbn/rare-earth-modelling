import { DirectivesModule } from './../../directives/directives.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabelaperiodicaComponent } from './tabela-periodica.component';
import { EtrTemplateComponent } from './etr-template/etr-template.component';

const periodicTableRoutes: Routes = [
  {
    path: 'tabela-periodica', component: TabelaperiodicaComponent,
    children: [
      { path: ':etr', component: TabelaperiodicaComponent }
    ]
  }
];

@NgModule({
  declarations: [
    TabelaperiodicaComponent,
    EtrTemplateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(periodicTableRoutes),
    DirectivesModule,
  ],
  exports: [
    RouterModule
  ]
})
export class TabelaPeriodicaModule { }
