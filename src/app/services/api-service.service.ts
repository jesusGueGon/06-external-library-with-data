import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GraficData } from '../interfaces/grafic-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private baseUrl: string = 'https://api.covidtracking.com/v1/us/daily.json';

  constructor(private httpClient: HttpClient) { }

  searchCovid(): Observable<GraficData[]>{
    return this.httpClient.get<GraficData[]>(this.baseUrl);
  }

}
