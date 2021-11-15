import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProjectService } from '../../services/project.service';
import { PROJECT } from '../../../mocks/project';
import { Project } from '../../contracts/Interfaces/Project';

@Component({
  selector: 'app-modal-configuration',
  templateUrl: './modal-configuration.component.html',
  styleUrls: ['./modal-configuration.component.scss']
})
export class ModalConfigurationComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<ModalConfigurationComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { project: Project }
  ) { }

  project!: Project;

  ngOnInit(): void {
    this.project = this.data ? this.data.project : this.buildProjectTemplate();
  }

  public onSave(): void {
    //TODO implement
    this.projectService.postProject(this.project as Project).subscribe(
      (response: boolean) => { console.log('to implement') }
    );

    this.closeModal();

  }

  public onCancel(): void {
    //TODO modal "are you sure you want to leave without saving your changes?"
    this.closeModal();
  }

  private closeModal(): void {
    this.dialogRef.close(this.data);
  }

  private buildProjectTemplate(): Project {
    return PROJECT;
  }

}
