import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  /*TODO: Make it env aware*/
  baseUrl: string = "http://localhost:8080/";
  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/user?role=ROLE_STUDENT');
  }
}
