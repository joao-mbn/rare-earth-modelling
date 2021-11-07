import { OperationalVariables } from './../classes/OperationalVariables';
import { ProjectConfigurations } from './../classes/ProjectConfigurations';
import { IsothermSimulationDto } from '../classes/DTOs/IsothermSimulationDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class IsothermService {

  ISOTHERM_URL = API_URL + 'isotherm/';

  constructor(private httpClient: HttpClient) {

  }

  public getSimulations(): Observable<IsothermSimulationDto> {
    return this.httpClient.get<IsothermSimulationDto>(this.ISOTHERM_URL + 'get-results/');
  }

  public postSimulations(requestParameters: { pH: number, aor: number, numberCells: number }): Observable<ArrayBuffer> {
    //TODO FIX Response type, transfer Request type to DTO Classes
    return this.httpClient.post<ArrayBuffer>(this.ISOTHERM_URL + 'post-conditions/', requestParameters);
  }

  public runIsothermSimulation(ProjectConfigurations: ProjectConfigurations, operationVariables: OperationalVariables): Observable<IsothermSimulationDto> {
    //TODO this should combine post and get services
    const endPoint = 'simulate-isotherm/';
    return this.httpClient.post<IsothermSimulationDto>(this.ISOTHERM_URL + endPoint, { ProjectConfigurations, operationVariables });
  }

}
