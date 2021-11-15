import { ModalConfigurationComponent } from './../modal-configuration/modal-configuration.component';
import { OperationalVariable } from '../../contracts/Interfaces/OperationalVariable';
import { ProjectSimulationResults } from '../../contracts/DTOs/ProjectSimulationResults';
import { IsothermSimulationDto } from '../../contracts/DTOs/IsothermSimulationDto';
import { IsothermService } from '../../services/isotherm.service';
import { Project } from '../../contracts/Interfaces/Project';
import { ProjectService } from '../../services/project.service';
import { Component, Input, OnInit, TrackByFunction } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as mocks from '../../../mocks/project';

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

  //@Input()
  operationalVariable: OperationalVariable = mocks.OPERATIONAL_VARIABLE
  operationalVariables: OperationalVariable[] = mocks.OPERATIONAL_VARIABLES;
  projects: Project[] = mocks.PROJECTS;
  projectOptionsToDropdown!: { value: (number | string), id: number | string, disabled: boolean }[];


  constructor(
    private ProjectService: ProjectService,
    private IsothermService: IsothermService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects(): void {

    this.ProjectService.getProjects().subscribe(
      (response: Project[]) => {
      } //TODO implement)
    );
    this.projects.forEach(project => project.isSelected = project.isSelected ?? false);
    this.updateProjectOptionsToDropdown();
  }

  public onRunSimulation(): void {
    //TODO implement
    if (this.isIsotherm) {
      this.IsothermService.runIsothermSimulation(this.projects[0], this.operationalVariables).subscribe(
        (response: IsothermSimulationDto) => { } // TODO implement
      )
    } else {
      this.ProjectService.runProjectsSimulation(this.projects).subscribe(
        (response: ProjectSimulationResults) => { } // TODO implement
      )
    }
  }

  public onCreateNewProject(): void {
    this.openConfigurationModal();
  }

  public onChangeSliderValue(params: OperationalVariable): void {
    const valueToUpdateIndex = this.operationalVariables.findIndex(operationVariable => operationVariable.shortString === params.shortString);
    this.operationalVariables[valueToUpdateIndex].value = params.value;
  }

  public onClickCheckbox(selectedProject: string | number): void {
    const project = this.projects.find(project => project.longString === selectedProject as string);
    if (project) { project.isSelected = project.isSelected ? false : true };
  }

  public onConfigureProject(project: Project): void {
    this.openConfigurationModal(project);
  }

  private updateProjectOptionsToDropdown(): void {
    this.projectOptionsToDropdown = this.projects.map(project => {
      return { value: project.longString, id: project.projectId, disabled: project.isDeleted ?? false as boolean };
    })
  }

  private openConfigurationModal(project?: Project): void {
    const dialogRef = this.dialog.open(ModalConfigurationComponent, {
      width: '800px',
      height: '600px',
      data: project ? { project: project } : undefined
    })
    dialogRef.afterClosed().subscribe(result => { console.table(result) });//TODO
  }

}
