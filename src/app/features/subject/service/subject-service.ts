import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getSubjects(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/subject');
  }

  createSubject(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/api/subject', data);
  }

  updateSubject(id: number, subject: any) {
    return this.httpClient.put(this.baseUrl + "/api/subject/" + id + "?includeDependencies=true", subject);
  }

  deleteSubject(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/api/subject/' + id);
  }

  getCategories(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/category');
  }

  getLevels(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/level');
  }
}
