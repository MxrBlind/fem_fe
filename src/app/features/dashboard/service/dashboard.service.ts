import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl: string = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {
  }

  getUserCount(role: String): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/user/count?role=' + role);
  }

  getCoursesCount(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/course/count');
  }

  getCurrentCycle(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/cycle');
  }

}
