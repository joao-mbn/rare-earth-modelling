import { SimulacoesService } from './../../../services/simulacoes.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Simulacoes } from 'src/app/classes/simulacoes';

@Component({
  selector: 'app-simulacoes',
  templateUrl: './simulacoes.component.html',
  styleUrls: ['./simulacoes.component.scss']
})

export class SimulacoesComponent implements OnInit {

  pHInputValue: number = 1;
  nEstagiosInputValue: number = 20;
  raoInputValue: number = 1;

  chartCanvas!: HTMLCanvasElement;
  simulacoes!: Simulacoes[];

  constructor(private simulacoesService: SimulacoesService) {

    this.simulacoesService.getSimulacoes()
      .subscribe(retorno => {
        this.simulacoes = retorno.map((simulacao: Simulacoes) => {
          return new Simulacoes(simulacao);
        });
      });
  }

  ngOnInit(): void {

    // graph construction
    Chart.register(...registerables);
    this.chartCanvas = <HTMLCanvasElement>document.getElementById('mcCabe-Thiele-chart-canvas');
    this.createMcCabeThieleChart();
  }

  createMcCabeThieleChart = (): void => {
    const McThieleChart = new Chart(this.chartCanvas, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }
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
