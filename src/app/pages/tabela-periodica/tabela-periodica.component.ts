import { EtrTemplateComponent } from './etr-template/etr-template.component';
import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ETR } from './etr-template/ETRclass';

@Component({
  selector: 'app-tabelaperiodica',
  templateUrl: './tabela-periodica.component.html',
  styleUrls: ['./tabela-periodica.component.scss']
})
export class TabelaperiodicaComponent implements OnInit {

  showEtrSummary: (simboloEtr: string, index: number) => void;
  etrObject!: ETR;
  listaSimbolosEtrs: string[];

  constructor(public periodicTableRouter: Router,
    public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) {

    this.listaSimbolosEtrs = [
      'Sc', 'Y', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Gd',
      'Eu', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu'
    ];

    this.showEtrSummary = (simboloEtr, index) => {
      this.etrObject = new ETR(EtrTemplateComponent, simboloEtr, 57 + index);
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.etrObject.component);
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent<ETR>(componentFactory);
      componentRef.instance.nome = this.etrObject.nome;
      componentRef.instance.Z = this.etrObject.Z;
    };

  }
  ngOnInit(): void {

  }

}

