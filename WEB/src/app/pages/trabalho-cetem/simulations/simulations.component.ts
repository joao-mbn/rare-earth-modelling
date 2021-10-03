import { SimulationTableDto } from './../../../classes/SimulationTableDto';
import { SimulationDto } from './../../../classes/SimulationDto';
import { SingleElementMcCabeThieleChart } from '../../../classes/SingleElementMcCabeThieleChart';
import { SingleElementDto } from '../../../classes/SingleElementDto';
import { SingleElementDataSet } from '../../../classes/SingleElementDataSet';
import { SimulationsService } from '../../../services/simulacoes.service';
import { Component, OnInit } from '@angular/core';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { hasKey } from 'src/app/utils/hasKey';
import { formatNumber } from 'src/app/utils/formatNumber';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-simulations',
  templateUrl: './simulations.component.html',
  styleUrls: ['./simulations.component.scss']
})

export class SimulationsComponent implements OnInit {

  public pHInputValue: number = 0.25;
  public nEstagiosInputValue: number = 40;
  public raoInputValue: number = 0.6;

  public mcCabeThieleChartsInfos: { [chartInfo: string]: SingleElementMcCabeThieleChart; } = {};
  public mcCabeThieleChartsKeys!: string[];
  private simulationChartData!: { [elementSymbol: string]: SingleElementDto };

  private simulationTableData!: SimulationTableDto;
  public simulationTableColumnsNames: string[] = [];
  public simulationTableRows!: { [key: string]: number }[];
  public simulationTableColumns: string[] = [];

  constructor(private SimulationsService: SimulationsService) {

  }

  ngOnInit(): void {

    this.updateSimulationData();

  }

  public updateSimulationData(): void {

    this.getSimulationData();

  }

  private getSimulationData(): void {

    this.SimulationsService.getSimulations().subscribe(
      (response: SimulationDto) => {

        this.simulationChartData = response.simulationChartDto;
        this.mcCabeThieleChartsKeys = Object.keys(this.simulationChartData);

        this.simulationTableData = response.simulationTableDto;

        this.createMcCabeThieleChart();
        this.createSimulationTable();
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

  private createSimulationTable(): void {

    let greatestLengthProperty = 0;

    Object.keys(this.simulationTableData).forEach((element) => {
      const columnsToTable = this.getColumnsToTable(element);
      greatestLengthProperty = this.getGreatestLength(greatestLengthProperty, columnsToTable, element);
    });

    this.simulationTableRows = Array(greatestLengthProperty).fill({});

    Object.keys(this.simulationTableData).forEach((element) => {

      this.getColumnsToTable(element).forEach(elementProperty => {

        if (hasKey(this.simulationTableData[element], elementProperty)) {

          const propertyArray = this.simulationTableData[element][elementProperty] as number[];
          this.simulationTableRows.map((dataRowObject, index) => dataRowObject[element + elementProperty] = formatNumber(propertyArray[index]));

        }
      })
    });

    this.simulationTableColumns = Object.keys(this.simulationTableRows[0]);
    this.simulationTableColumnsNames = this.parseTableColumnsToColumnNames(this.simulationTableColumns);

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
      this.updateSimulationData();
    });

  }

  private parseTableColumnsToColumnNames(tableColumns: string[]): string[] {

    const allElements = [... new Set(tableColumns.map(column => column.slice(0, 2)))].filter(element => element !== 'H+');

    return tableColumns.map((elementProperty) => {

      const element = elementProperty.slice(0, 2);
      const previousElement = allElements[allElements.indexOf(element) - 1];
      elementProperty = elementProperty.slice(2);

      switch (elementProperty) {
        case 'aqueousEquilibriumConcentrations':
          elementProperty = `${element} aq.`
          break
        case 'organicEquilibriumConcentrations':
          elementProperty = `${element} org.`
          break
        case 'D':
          elementProperty = `${element} D`
          break
        case `Beta${element}${previousElement}`:
          elementProperty = `Beta ${element}/${previousElement}`
          break
      }
      return elementProperty;

    });

  }

  private getColumnsToTable(element: string): string[] {

    return Object
      .keys(this.simulationTableData[element])
      .filter(elementProperty => elementProperty !== 'name' && elementProperty !== 'symbol');
  }

  getGreatestLength(greatestLengthProperty: number, columnsToTable: string[], element: string): number {

    columnsToTable.forEach(column => {

      if (hasKey(this.simulationTableData[element], column)) {

        const propertyLength = this.simulationTableData[element][column]?.length ?? 0;
        greatestLengthProperty = propertyLength > greatestLengthProperty ? propertyLength : greatestLengthProperty;

      }
    });
    return greatestLengthProperty;

  }

}

