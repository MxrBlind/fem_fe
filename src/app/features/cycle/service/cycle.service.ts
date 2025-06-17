import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CycleService {

  private baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  getCurrentCycle(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/cycle/current');
  }

  getCoursesByCycle(cycleId: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/course/cycle/' + cycleId);
  }

}
