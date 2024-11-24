import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  baseUrl: string = environment.apiUrl;

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
    return this.httpClient.put(this.baseUrl + "/api/course/" + id + "?includeDependencies=true", data);
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

  getLevels(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/level');
  }
}
