import { ProjectConfigurationsDto } from './../classes/DTOs/ProjectConfigurationsDto';
import { API_URL } from './apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProjectSimulationResultsDto } from '../classes/DTOs/ProjectSimulationResultsDto';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private PROJECT_URL = API_URL + 'project/';

  constructor(private httpClient: HttpClient) { }

  public postProjectConfigurations(projectConfigurationsDto: ProjectConfigurationsDto): Observable<boolean> {
    const endPoint = 'post-configurations/';
    return this.httpClient.post<boolean>(this.PROJECT_URL + endPoint, projectConfigurationsDto);
  }

  public getProjectConfigurations(): Observable<ProjectConfigurationsDto> {
    const endPoint = 'get-configurations/';
    return this.httpClient.get<ProjectConfigurationsDto>(this.PROJECT_URL + endPoint);
  }

  public getProjects(): Observable<ProjectConfigurationsDto[]> {
    const endPoint = 'get-projects/';
    return this.httpClient.get<ProjectConfigurationsDto[]>(this.PROJECT_URL + endPoint);
  }

  public runProjectsSimulation(projectsConfigurationsDto: ProjectConfigurationsDto[]): Observable<ProjectSimulationResultsDto[]> {
    const endPoint = 'simulate-project/';
    return this.httpClient.post<ProjectSimulationResultsDto[]>(this.PROJECT_URL + endPoint, projectsConfigurationsDto);
  }

}
