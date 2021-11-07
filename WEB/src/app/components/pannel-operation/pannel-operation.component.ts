import { OPERATIONAL_VARIABLES_RANGE_ARRAY } from './../../../mocks/mocks';
import { OperationalVariables } from '../../classes/OperationalVariables';
import { ProjectSimulationResults } from '../../classes/ProjectSimulationResults';
import { IsothermSimulationDto } from './../../classes/DTOs/IsothermSimulationDto';
import { IsothermService } from './../../services/isotherm.service';
import { ProjectConfigurations } from './../../classes/ProjectConfigurations';
import { ProjectService } from './../../services/project.service';
import { Component, Input, OnInit } from '@angular/core';
import { OPERATIONAL_VARIABLES, CONCENTRATION_UOM_LIST } from '../../../mocks/mocks';

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
  loadedProjects!: ProjectConfigurations[];

  concentrationUomOptions = CONCENTRATION_UOM_LIST;
  chosenConcentrationUom?: string;

  //@Input()
  operationalVariables: OperationalVariables = OPERATIONAL_VARIABLES
  paramsToSlider: OperationalVariables = OPERATIONAL_VARIABLES;
  operationalVariablesToSlider: OperationalVariables[] = OPERATIONAL_VARIABLES_RANGE_ARRAY;

  constructor(private ProjectService: ProjectService, private IsothermService: IsothermService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  public onRunSimulation(): void {
    //TODO implement
    if (this.isIsotherm) {
      this.IsothermService.runIsothermSimulation(this.loadedProjects[0], this.operationalVariables).subscribe(
        (response: IsothermSimulationDto) => { } // TODO implement
      )
    } else {
      this.ProjectService.runProjectsSimulation(this.loadedProjects).subscribe(
        (response: ProjectSimulationResults) => { } // TODO implement
      )
    }
  }

  public onCreateNewProject(): void {
    //TODO implement
    // go to configuration pannel
  }

  private loadProjects(): void {

    this.ProjectService.getProjects().subscribe(
      (response: ProjectConfigurations[]) => { } //TODO implement)
    );

  }

  public onSelectConcentrationUom(event: string | number): void {

    this.chosenConcentrationUom = event as string;

  }

  public onChangeSliderValue(params: OperationalVariables): void {

    const valueToUpdateIndex = this.operationalVariablesToSlider.findIndex(operationVariable => operationVariable.shortString === params.shortString);
    this.operationalVariablesToSlider[valueToUpdateIndex].value = params.value;

  }

}
