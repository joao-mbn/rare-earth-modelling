import { SimulationTableDto } from './../../../classes/SimulationTableDto';
import { SimulationDto } from './../../../classes/SimulationDto';
import { SingleElementMcCabeThieleChart } from '../../../classes/SingleElementMcCabeThieleChart';
import { SingleElementDto } from '../../../classes/SingleElementDto';
import { SingleElementDataSet } from '../../../classes/SingleElementDataSet';
import { SimulationsService } from '../../../services/simulacoes.service';
import { Component, OnInit } from '@angular/core';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-simulations',
  templateUrl: './simulations.component.html',
  styleUrls: ['./simulations.component.scss']
})

export class SimulationsComponent implements OnInit {

  dataSource = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];

  columnsToDisplay = Object.keys(this.dataSource[0]);

  public pHInputValue: number = 0.25;
  public nEstagiosInputValue: number = 40;
  public raoInputValue: number = 0.6;

  public mcCabeThieleChartsInfos: { [chartInfo: string]: SingleElementMcCabeThieleChart; } = {};
  public mcCabeThieleChartsKeys!: string[];

  private simulationChartData!: { [elementSymbol: string]: SingleElementDto };
  private simulationTableData!: SimulationTableDto;

  constructor(private SimulationsService: SimulationsService) {

  }

  ngOnInit(): void {

    this.updateMcCabeThieleChart();

  }

  public updateMcCabeThieleChart(): void {

    this.getMcCabeThieleChartData();

  }

  private getMcCabeThieleChartData(): void {

    this.SimulationsService.getSimulations().subscribe(
      (response: SimulationDto) => {

        this.simulationChartData = response.simulationChartDto;
        this.mcCabeThieleChartsKeys = Object.keys(this.simulationChartData);

        this.simulationTableData = response.simulationTableDto;

        this.createMcCabeThieleChart();
      }
    );

  }

  private createMcCabeThieleChart(): void {

    Object.keys(this.simulationChartData).forEach(key => {

      const singleElementData = this.simulationChartData[key];

      const singleElementEquilibriumPointsDataSet = new SingleElementDataSet();
      singleElementEquilibriumPointsDataSet.x = singleElementData.aqueousEquilibriumConcentrations;
      singleElementEquilibriumPointsDataSet.y = singleElementData.organicEquilibriumConcentrations;
      singleElementEquilibriumPointsDataSet.name = `${singleElementData.name} Equilibrium Curve`;
      singleElementEquilibriumPointsDataSet.mode = 'lines';

      const singleElementOperatingPointsDataSet = new SingleElementDataSet();
      singleElementOperatingPointsDataSet.x = singleElementData.aqueousOperatingConcentrations;
      singleElementOperatingPointsDataSet.y = singleElementData.organicOperatingConcentrations;
      singleElementOperatingPointsDataSet.name = `${singleElementData.name} Operating Line`;
      singleElementOperatingPointsDataSet.mode = 'lines';

      const singleElementStagesDataSet = new SingleElementDataSet();
      singleElementStagesDataSet.x = singleElementData.aqueousStageConcentrations;
      singleElementStagesDataSet.y = singleElementData.organicStageConcentrations;
      singleElementStagesDataSet.name = `${singleElementData.name} Stages`;
      singleElementStagesDataSet.mode = 'lines+markers';

      const mcCabeThieleChartInfo: SingleElementMcCabeThieleChart = {
        data: [singleElementEquilibriumPointsDataSet, singleElementOperatingPointsDataSet, singleElementStagesDataSet],
        layout: {
          title: `${singleElementData.name} Extraction`
        }
      }

      this.mcCabeThieleChartsInfos[key] = mcCabeThieleChartInfo;

    });

  }

  public onInputValueUpdate(event: Event): void {

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

    this.SimulationsService.postSimulations({
      pH: this.pHInputValue,
      rao: this.raoInputValue,
      nStages: this.nEstagiosInputValue
    }).subscribe(() => {
      this.updateMcCabeThieleChart();
    });

  }

}
