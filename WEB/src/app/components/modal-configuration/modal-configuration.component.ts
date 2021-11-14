import { Component, Inject, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { OPERATIONAL_VARIABLE_RANGE, PROJECT_CONFIGURATIONS } from '../../../mocks/mocks';
import { ProjectConfigurations } from '../../classes/ProjectConfigurations';
import { OperationalVariable } from '../../classes/OperationalVariable';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-configuration',
  templateUrl: './modal-configuration.component.html',
  styleUrls: ['./modal-configuration.component.scss']
})
export class ModalConfigurationComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<ModalConfigurationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectConfigurations
  ) { }

  paramsToRangeSlider: OperationalVariable = OPERATIONAL_VARIABLE_RANGE;

  ngOnInit(): void {

  }

  public onSave(): void {
    //TODO implement
    const configurationsToSave: ProjectConfigurations = PROJECT_CONFIGURATIONS;
    this.projectService.postProjectConfigurations(configurationsToSave).subscribe(
      (response: boolean) => { console.log('to implement') }
    );

  }

  public onOpenProjectSummary(): void {
    //TODO implement
    this.projectService.getProjects().subscribe(
      (response: ProjectConfigurations[]) => { console.log('to implement') }
    );

  }

}
