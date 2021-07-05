import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Simulacoes } from '../classes/simulacoes';

@Injectable({
  providedIn: 'root'
})
export class SimulacoesService {

  private url = 'http://localhost:3000/simulacoes';

  constructor(private _httpClient: HttpClient) {

  }

  getSimulacoes(): Observable<Simulacoes[]> {
    /* a declaração de observable torna a requisição assíncrona */
    return this._httpClient.get<Simulacoes[]>(this.url)
  }

}
