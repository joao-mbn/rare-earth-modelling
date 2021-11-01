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

  configurationsToSave: ProjectConfigurationsDto = PROJECT_CONFIGURATIONS_DTO_MOCK;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {

  }

  public onSave() {

    this.projectService.postProjectConfigurations(this.configurationsToSave).subscribe(
      (response: boolean) => {
        console.log(response)
      }, (error: any) => {
        console.log(error);
      }, () => {
        console.log('completed')
      }
    );

    this.projectService.getProjectConfigurations().subscribe(
      (response: ProjectConfigurationsDto) => {
        console.log(response)
      }, (error: any) => {
        console.log(error);
      }, () => {
        console.log('completed too')
      }
    );

  }

}
