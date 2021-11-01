import { SimulationDto } from '../classes/DTOs/SimulationDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class SimulationsService {

  //TODO Give a more meaninful name to simulation stuff, such as isotherm simulation in contrast to project
  SIMULATIONS_URL = API_URL + 'simulations/';

  constructor(private httpClient: HttpClient) {

  }

  public getSimulations(): Observable<SimulationDto> {
    return this.httpClient.get<SimulationDto>(this.SIMULATIONS_URL + 'get-results/');
  }

  public postSimulations(requestParameters: { pH: number, aor: number, numberCells: number }): Observable<ArrayBuffer> {
    //TODO FIX Response type, transfer Request type to DTO Classes
    return this.httpClient.post<ArrayBuffer>(this.SIMULATIONS_URL + 'post-conditions/', requestParameters);
  }

}
