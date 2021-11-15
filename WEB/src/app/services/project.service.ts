import { Project } from '../contracts/Interfaces/Project';
import { ProjectSimulationResults } from '../contracts/DTOs/ProjectSimulationResults';
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

  public postProject(project: Project): Observable<boolean> {
    const endPoint = 'post-project/';
    return this.httpClient.post<boolean>(this.PROJECT_URL + endPoint, project);
  }

  public getProjects(): Observable<Project[]> {
    const endPoint = 'get-projects/';
    return this.httpClient.get<Project[]>(this.PROJECT_URL + endPoint);
  }

  public runProjectsSimulation(projects: Project[]): Observable<ProjectSimulationResults[]> {
    const endPoint = 'simulate-projects/';
    return this.httpClient.post<ProjectSimulationResults[]>(this.PROJECT_URL + endPoint, projects);
  }

}
