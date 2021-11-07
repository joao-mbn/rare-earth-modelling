import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../../services/project.service';
import { OPERATIONAL_VARIABLE_RANGE, PROJECT_CONFIGURATIONS } from './../../../mocks/mocks';
import { ProjectConfigurations } from './../../classes/ProjectConfigurations';
import { OperationalVariable } from './../../classes/OperationalVariable';

@Component({
  selector: 'app-pop-up-project-configuration',
  templateUrl: './pop-up-project-configuration.component.html',
  styleUrls: ['./pop-up-project-configuration.component.scss']
})
export class PopUpProjectConfigurationComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

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
