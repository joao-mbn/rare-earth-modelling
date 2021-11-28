import { InputField } from './../../contracts/Classes/InputField';
import { DropdownField } from 'src/app/contracts/Classes/DropdownField';
import { OptionToDropdown } from 'src/app/contracts/Interfaces/OptionToDropdown';
import { ModalConfigurationComponent } from './../modal-configuration/modal-configuration.component';
import { OperationalVariable } from '../../contracts/Interfaces/OperationalVariable';
import { ProjectSimulationResults } from '../../contracts/DTOs/ProjectSimulationResults';
import { IsothermSimulationDto } from '../../contracts/DTOs/IsothermSimulationDto';
import { IsothermService } from '../../services/isotherm.service';
import { Project } from '../../contracts/Interfaces/Project';
import { ProjectService } from '../../services/project.service';
import { Component, Input, OnInit } from '@angular/core';
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
  projectPropertiesToDropdown!: DropdownField;


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

  public onConfigureProject(project: Project): void {
    this.openConfigurationModal(project);
  }

  /* public onChangeSliderValue(params: InputField): void {
    const valueToUpdateIndex = this.operationalVariables.findIndex(operationVariable => operationVariable.shortString === params.shortString);
    this.operationalVariables[valueToUpdateIndex].value = params.value as number | number[];
  } */

  public onSelectProject(option: OptionToDropdown): void {
    const project = this.projects.find(project => project.longString === option.value as string);
    if (project) { project.isSelected = project.isSelected ? false : true };
  }

  private updateProjectOptionsToDropdown(): void {
    this.projectPropertiesToDropdown = new DropdownField({
      options: this.projects.map(project => { return { value: project.longString, id: project.projectId, disabled: project.isDeleted ?? false as boolean }; }),
      multiple: true,
      label: 'Load Existing Project...',
      key: 'projectProperties'
    })
  }

  private openConfigurationModal(project?: Project): void {
    const dialogRef = this.dialog.open(ModalConfigurationComponent, {
      width: '1800px',
      height: '900px',
      data: project ? { project: project } : undefined
    })
    dialogRef.afterClosed().subscribe((project: Project) => { console.table(project) });//TODO
  }

}
