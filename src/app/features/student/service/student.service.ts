import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  /*TODO: Make it env aware*/
  baseUrl: string = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/user?role=ROLE_STUDENT');
  }

  addStudent(data: any): Observable<any> {
    console.log("data:" + data);
    return this.httpClient.post(this.baseUrl + '/api/user', data);
  }

  updateStudent(id: number, data: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + "/api/user/" + id, data);
  }

  deleteStudent(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "/api/user/" + id);
  }
}
