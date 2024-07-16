import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl: string = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  getStudentsCount(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/user/count');
  }

  getCoursesCount(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/course/count');
  }

}
