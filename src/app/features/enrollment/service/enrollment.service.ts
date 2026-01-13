import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  getEnrollments(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/enrollment');
  }

  addEnrollment(enrollment: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/api/enrollment', enrollment);
  }

  updateEnrollment(id: number, enrollment: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/api/enrollment/' + id, enrollment);
  }

  deleteEnrollment(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/api/enrollment/' + id);
  }

  getStudents(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/user?role=ROLE_STUDENT');
  }

  getCoursesByCycle(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/course/cycle/' + id);
  }

  getCurrentCycle(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/cycle/current');
  }

}
