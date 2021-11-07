import { ProjectConfigurations } from './../classes/ProjectConfigurations';
import { ProjectSimulationResults } from '../classes/ProjectSimulationResults';
import { API_URL } from './apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private PROJECT_URL = API_URL + 'project/';

  constructor(private httpClient: HttpClient) { }

  public postProjectConfigurations(projectConfigurations: ProjectConfigurations): Observable<boolean> {
    const endPoint = 'post-project-configurations/';
    return this.httpClient.post<boolean>(this.PROJECT_URL + endPoint, projectConfigurations);
  }

  public getProjects(): Observable<ProjectConfigurations[]> {
    const endPoint = 'get-projects/';
    return this.httpClient.get<ProjectConfigurations[]>(this.PROJECT_URL + endPoint);
  }

  public runProjectsSimulation(projectsConfigurations: ProjectConfigurations[]): Observable<ProjectSimulationResults[]> {
    const endPoint = 'simulate-project/';
    return this.httpClient.post<ProjectSimulationResults[]>(this.PROJECT_URL + endPoint, projectsConfigurations);
  }

}
