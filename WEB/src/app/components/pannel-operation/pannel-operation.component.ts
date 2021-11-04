import { ParamsToSlider } from '../../classes/ParamsToSlider';
import { ProjectSimulationDto } from '../../classes/DTOs/ProjectSimulationDto';
import { IsothermSimulationDto } from './../../classes/DTOs/IsothermSimulationDto';
import { IsothermService } from './../../services/isotherm.service';
import { ProjectConfigurationsDto } from './../../classes/DTOs/ProjectConfigurationsDto';
import { ProjectService } from './../../services/project.service';
import { Component, Input, OnInit } from '@angular/core';
import { PARAMS_TO_SLIDER_MOCK } from '../../../mocks/paramsToSliderMock';
import { CONCENTRATION_UOM_LIST_MOCK } from 'src/mocks/concentrationUomListMock';

@Component({
  selector: 'app-pannel-operation',
  templateUrl: './pannel-operation.component.html',
  styleUrls: ['./pannel-operation.component.scss']
})
export class PannelOperationComponent implements OnInit {

  // insert from parent page project or isotherm @Input() isIsotherm!: boolean;
  // insert from parent page isotherm @Input() operation variables: boolean;
  // TODO get proper @Input
  isIsotherm = true;
  loadedProjects!: ProjectConfigurationsDto[];
  operationVariables!: number[];

  concentrationUomOptions = CONCENTRATION_UOM_LIST_MOCK;
  chosenConcentrationUom?: string;

  //@Input()
  operationVariablesToSlider: ParamsToSlider[] = [PARAMS_TO_SLIDER_MOCK];
  paramsToSlider: ParamsToSlider = PARAMS_TO_SLIDER_MOCK;

  constructor(private ProjectService: ProjectService, private IsothermService: IsothermService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  public onRunSimulation(): void {
    //TODO implement
    if (this.isIsotherm) {
      this.IsothermService.runIsothermSimulation(this.loadedProjects[0], this.operationVariables).subscribe(
        (response: IsothermSimulationDto) => { } // TODO implement
      )
    } else {
      this.ProjectService.runProjectsSimulation(this.loadedProjects).subscribe(
        (response: ProjectSimulationDto) => { } // TODO implement
      )
    }
  }

  public onCreateNewProject(): void {
    //TODO implement
    // go to configuration pannel
  }

  private loadProjects(): void {

    this.ProjectService.getProjects().subscribe(
      (response: ProjectConfigurationsDto[]) => { } //TODO implement)
    );

  }

  public onSelectConcentrationUom(event: string | number): void {

    this.chosenConcentrationUom = event as string;

  }

  public onChangeSliderValue(params: ParamsToSlider): void {

    const valueToUpdateIndex = this.operationVariablesToSlider.findIndex(operationVariable => operationVariable.propertyName === params.propertyName);
    this.operationVariablesToSlider[valueToUpdateIndex].value = params.value;

  }

}
