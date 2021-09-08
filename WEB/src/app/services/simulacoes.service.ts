import { SingleElementDto } from '../classes/SingleElementDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimulationsService {

  private url = 'http://127.0.0.1:5000/simulations/';

  constructor(private httpClient: HttpClient) {

  }

  public getSimulations(): Observable<{ [elementSymbol: string]: SingleElementDto}> {
    return this.httpClient.get<{[elementSymbol: string]: SingleElementDto}>(this.url + 'get-results/');
  }

  public postSimulations(requestParameters: {pH: number, rao: number, nStages: number}): Observable<ArrayBuffer> {
    return this.httpClient.post<ArrayBuffer>(this.url + 'post-conditions/', requestParameters);
  }

}
