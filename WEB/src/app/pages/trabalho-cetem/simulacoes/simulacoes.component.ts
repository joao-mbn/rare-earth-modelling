import { SingleElementMcCabeThieleChart } from '../../../classes/SingleElementMcCabeThieleChart';
import { SingleElementDto } from '../../../classes/SingleElementDto';
import { SingleElementDataSet } from '../../../classes/SingleElementDataSet';
import { SimulationsService } from './../../../services/simulacoes.service';
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

  simulationData!: { [elementSymbol: string]: SingleElementDto };
  public mcCabeThieleChartsInfos: { [chartInfo: string]: SingleElementMcCabeThieleChart; } = {};
  public mcCabeThieleChartsKeys!: string[];

  constructor(private SimulationsService: SimulationsService) {

  }

  ngOnInit(): void {

    this.updateMcCabeThieleChart();

  }

  public async updateMcCabeThieleChart(): Promise<void> {

    await this.getMcCabeThieleChartData();
    this.createMcCabeThieleChart();

  }

  private async getMcCabeThieleChartData(): Promise<void> {

    this.simulationData = await this.SimulationsService.getSimulations().toPromise();
    this.mcCabeThieleChartsKeys = Object.keys(this.simulationData);

  }

  private createMcCabeThieleChart(): void {

    Object.keys(this.simulationData).forEach(key => {

      const singleElementData = this.simulationData[key];

      const singleElementEquilibriumPointsDataSet = new SingleElementDataSet();
      singleElementEquilibriumPointsDataSet.x = singleElementData.aqueousConcentrations;
      singleElementEquilibriumPointsDataSet.y = singleElementData.organicConcentrations;
      singleElementEquilibriumPointsDataSet.name = `${singleElementData.name} Equilibrium Curve`;
      singleElementEquilibriumPointsDataSet.mode = 'lines';

      const singleElementStagesDataSet = new SingleElementDataSet();
      [singleElementStagesDataSet.x,
        singleElementStagesDataSet.y] = singleElementStagesDataSet.stageConcentrations(
          singleElementData.aqueousConcentrations, singleElementData.organicConcentrations);
      singleElementStagesDataSet.name = `${singleElementData.name} Stages`;
      singleElementStagesDataSet.mode = 'lines+markers';

      const mcCabeThieleChartInfo: SingleElementMcCabeThieleChart = {
        data: [singleElementEquilibriumPointsDataSet, singleElementStagesDataSet],
        layout: {
          title: `${singleElementData.name} Extraction`
        }
      }

      this.mcCabeThieleChartsInfos[key] = mcCabeThieleChartInfo;

    });

  }

  public async onInputValueUpdate(event: Event): Promise<void> {

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

    await this.SimulationsService.postSimulations({
      pH: this.pHInputValue,
      rao: this.raoInputValue,
      nStages: this.nEstagiosInputValue
    }).toPromise();

    this.updateMcCabeThieleChart();

  }

}
