import { IScatterPlot } from './../../../interfaces/IScatterPlot';
import { IElementExtractionData, IElementsExtractionData } from './../../../interfaces/IElementExtractionData';
import { ISingleElementDataSet, IAllElementsDataSets } from '../../../interfaces/IDataSet';
import { SimulacoesService } from './../../../services/simulacoes.service';
import { Component, OnInit } from '@angular/core';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;
@Component({
  selector: 'app-simulacoes',
  templateUrl: './simulacoes.component.html',
  styleUrls: ['./simulacoes.component.scss']
})

export class SimulacoesComponent implements OnInit {

  pHInputValue: number = 1;
  nEstagiosInputValue: number = 20;
  raoInputValue: number = 1;

  allElementsDataSets: IAllElementsDataSets = {};
  mcCabeThieleChartData!: IElementsExtractionData;
  public mcCabeThieleChart!: IScatterPlot;

  constructor(private simulacoesService: SimulacoesService) {

  }

  ngOnInit(): void {

    this.updateMcCabeThieleChart();

  }

  private async updateMcCabeThieleChart(): Promise<void> {

    await this.getMcCabeThieleChartData();
    this.createDataSets();
    this.createMcCabeThieleChart();

  }

  private async getMcCabeThieleChartData(): Promise<void> {

    const simulationPromise = await this.simulacoesService.getSimulacoes().toPromise();
    this.mcCabeThieleChartData = simulationPromise;

  }

  private createMcCabeThieleChart() {

    const dysprosium = Object.keys(this.mcCabeThieleChartData)[0];
    const dysprosiumDataSet = this.allElementsDataSets[dysprosium];
    const layout = {
      title: 'Dysprosium extraction'
    }

    this.mcCabeThieleChart = {
      data: [dysprosiumDataSet],
      layout: layout
    }

  }

  private createDataSets(): void {

    Object.keys(this.mcCabeThieleChartData).forEach(key => {

      const singleElementData: IElementExtractionData = this.mcCabeThieleChartData[key];
      const singleElementDataSet: ISingleElementDataSet = {
        x: singleElementData.aqueousConcentrations,
        y: singleElementData.organicConcentrations,
        mode: 'lines+markers',
        name: singleElementData.name
      };
      this.allElementsDataSets[singleElementData.symbol] = singleElementDataSet;

    });

  }

  onInputValueUpdate(event: Event): void {

    const eventTarget = <HTMLInputElement>event.target;
    const eventTargetValue = parseFloat(eventTarget.value);
    const eventTargetId = eventTarget.id;

    switch (eventTargetId) {
      case 'pH-slider':
        this.pHInputValue = eventTargetValue;
        break;
      case 'nEstagios-slider':
        this.nEstagiosInputValue = eventTargetValue;
        break;
      case 'rao-slider':
        this.raoInputValue = eventTargetValue;
    }

  }

}
