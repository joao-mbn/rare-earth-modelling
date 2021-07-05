import { HistoriaComponent } from './pages/historia/historia.component';
import { CenarioMundialComponent } from './pages/cenario-mundial/cenario-mundial.component';
import { AplicacoesComponent } from './pages/aplicacoes/aplicacoes.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'historia', component: HistoriaComponent },
  { path: 'aplicacoes', component: AplicacoesComponent },
  { path: 'cenario-mundial', component: CenarioMundialComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
