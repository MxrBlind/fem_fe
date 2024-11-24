import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  getTeachers(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/user?role=ROLE_TEACHER');
  }

  addTeacher(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/api/user', data);
  }

  updateTeacher(id: number, data: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + "/api/user/" + id, data);
  }

  deleteTeacher(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "/api/user/" + id);
  }

}
