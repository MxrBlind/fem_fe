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

  getAllCycles(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/cycle');
  }

  deleteCycle(cycleId: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/api/cycle/' + cycleId);
  }

  addCycle(cycle: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/api/cycle', cycle);
  }

  updateCycle(cycleId: number, cycle: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/api/cycle/' + cycleId, cycle);
  }

  getPrincipals(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/user?role=ROLE_TEACHER');
  }

}
