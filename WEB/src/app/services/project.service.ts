import { API_URL } from './apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectConfigurationsDto } from '../classes/DTOs/ProjectConfigurationsDto';
import { Injectable } from '@angular/core';

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

}
