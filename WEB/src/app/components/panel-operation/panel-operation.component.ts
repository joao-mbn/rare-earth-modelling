import { OperationalVariable } from '../../classes/OperationalVariable';
import { ProjectSimulationResults } from '../../classes/ProjectSimulationResults';
import { IsothermSimulationDto } from '../../classes/DTOs/IsothermSimulationDto';
import { IsothermService } from '../../services/isotherm.service';
import { ProjectConfigurations } from '../../classes/ProjectConfigurations';
import { ProjectService } from '../../services/project.service';
import { Component, Input, OnInit, TrackByFunction } from '@angular/core';
import * as mocks from '../../../mocks/mocks';

@Component({
  selector: 'app-panel-operation',
  templateUrl: './panel-operation.component.html',
  styleUrls: ['./panel-operation.component.scss']
})
export class PanelOperationComponent implements OnInit {

  // insert from parent page project or isotherm @Input() isIsotherm!: boolean;
  // insert from parent page isotherm @Input() operation variables: boolean;
  // TODO get proper @Input
  isIsotherm = true;

  concentrationUomOptions = mocks.CONCENTRATION_UOM_LIST;
  chosenConcentrationUom?: string;

  //@Input()
  operationalVariable: OperationalVariable = mocks.OPERATIONAL_VARIABLE
  operationalVariables: OperationalVariable[] = mocks.OPERATIONAL_VARIABLES;
  projectConfigurations: ProjectConfigurations[] = mocks.PROJECTS_CONFIGURATIONS;
  projectOptionsToDropdown!: { value: (number | string), id: number | string, disabled: boolean }[];


  constructor(private ProjectService: ProjectService, private IsothermService: IsothermService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects(): void {

    this.ProjectService.getProjects().subscribe(
      (response: ProjectConfigurations[]) => {
      } //TODO implement)
    );
    this.projectConfigurations.forEach(project => project.isSelected = project.isSelected ?? false);
    this.updateProjectOptionsToDropdown();
  }

  public onRunSimulation(): void {
    //TODO implement
    if (this.isIsotherm) {
      this.IsothermService.runIsothermSimulation(this.projectConfigurations[0], this.operationalVariable).subscribe(
        (response: IsothermSimulationDto) => { } // TODO implement
      )
    } else {
      this.ProjectService.runProjectsSimulation(this.projectConfigurations).subscribe(
        (response: ProjectSimulationResults) => { } // TODO implement
      )
    }
  }

  public onCreateNewProject(): void {
    //TODO implement
    // go to configuration panel
  }

  public onChangeSliderValue(params: OperationalVariable): void {
    const valueToUpdateIndex = this.operationalVariables.findIndex(operationVariable => operationVariable.shortString === params.shortString);
    this.operationalVariables[valueToUpdateIndex].value = params.value;
  }

  public onClickCheckbox(selectedProject: string | number): void {
    const projectConfigurations = this.projectConfigurations.find(project => project.name === selectedProject as string);
    if (projectConfigurations) { projectConfigurations.isSelected = projectConfigurations.isSelected ? false : true };
  }

  public onConfigureProject(projectConfigurations: ProjectConfigurations): void {
    //TODO Implement
  }

  public trackSelectedProject(index: number, project: ProjectConfigurations): number {
    return project.id;
  }

  private updateProjectOptionsToDropdown(): void {

    this.projectOptionsToDropdown = this.projectConfigurations.map(project => {
      return { value: project.name, id: project.id, disabled: project.isDeleted ?? false as boolean };
    })

  }

}
