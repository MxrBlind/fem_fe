import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  /*TODO: Make it env aware*/
  baseUrl: string = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {
  }

  getCourses(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/course');
  }

  getCourse(id: number) {
    return this.httpClient.get(this.baseUrl + '/api/course/' + id);
  }

  createCourse (data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/api/course', data);
  }

  updateCourse(id: number, data: any) {
    return this.httpClient.put(this.baseUrl + "/api/course/" + id, data);
  }

  deleteCourse(id: number) {
    return this.httpClient.delete(this.baseUrl + "/api/course/" + id);
  }

  getCategories(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/category');
  }

  getTeachers(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/user?role=ROLE_TEACHER');
  }
}
