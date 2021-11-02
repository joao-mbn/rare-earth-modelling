import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { ProjectConfigurationsDto } from 'src/app/classes/DTOs/ProjectConfigurationsDto';
import { PROJECT_CONFIGURATIONS_DTO_MOCK } from 'src/mocks/ProjectConfigurationsDtoMock';

@Component({
  selector: 'app-pop-up-project-configuration',
  templateUrl: './pop-up-project-configuration.component.html',
  styleUrls: ['./pop-up-project-configuration.component.scss']
})
export class PopUpProjectConfigurationComponent implements OnInit {

  constructor(private ProjectService: ProjectService) { }

  ngOnInit(): void {

  }

  public onSave(): void {
    //TODO implement
    const configurationsToSave: ProjectConfigurationsDto = PROJECT_CONFIGURATIONS_DTO_MOCK;
    this.ProjectService.postProjectConfigurations(configurationsToSave).subscribe(
      (response: boolean) => { console.log('to implement') }
    );

  }

  public onOpenProjectSummary(): void {
    //TODO implement
    this.ProjectService.getProjectConfigurations().subscribe(
      (response: ProjectConfigurationsDto) => { console.log('to implement') }
    );

  }

}