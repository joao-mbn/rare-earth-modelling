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
  projectsNamesOnDropdown!: string[];

  constructor(private ProjectService: ProjectService, private IsothermService: IsothermService) { }

  ngOnInit(): void {
    this.loadProjects();
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

  private loadProjects(): void {

    this.ProjectService.getProjects().subscribe(
      (response: ProjectConfigurations[]) => {
      } //TODO implement)
    );
    this.projectsNamesOnDropdown = this.projectConfigurations.map((project) => project.name);
  }

  public onChangeSliderValue(params: OperationalVariable): void {
    const valueToUpdateIndex = this.operationalVariables.findIndex(operationVariable => operationVariable.shortString === params.shortString);
    this.operationalVariables[valueToUpdateIndex].value = params.value;
  }

  public onSelectProject(selectedProject: string | number): void {
    //usar a propriedade projectConfigurations e o atributo selected
    const selectProjectIndex = this.projectsNamesOnDropdown.indexOf(selectedProject as string);
    this.projectsNamesOnDropdown.splice(selectProjectIndex, 1);
  }

  public onDismissProject(projectConfigurations: ProjectConfigurations): void {
    //usar a propriedade projectConfigurations e o atributo selected
    /* const unselectProjectIndex = this.selectedProjects.indexOf(unSelectedProject);
    this.selectedProjects.splice(unselectProjectIndex, 1);
    this.projectsNamesOnDropdown.push(unSelectedProject); */
  }

  public onConfigureProject(projectConfigurations: ProjectConfigurations): void {
    //TODO Implement
  }

  public onDeleteProject(projectConfigurations: ProjectConfigurations): void {
    //TODO Implement
    //projectName: missing delete service
  }

  public trackSelectedProject(index: number, project: { id: number, name: string }): number {
    return project.id;
  }

}
