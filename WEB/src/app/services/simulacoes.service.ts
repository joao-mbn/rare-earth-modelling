import { IElementsExtractionData } from './../interfaces/IElementExtractionData';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimulacoesService {

  private url = 'http://127.0.0.1:5000/';

  constructor(private httpClient: HttpClient) {

  }

  public getSimulacoes(): Observable<IElementsExtractionData> {

    return this.httpClient.get<IElementsExtractionData>(this.url)

  }

}
