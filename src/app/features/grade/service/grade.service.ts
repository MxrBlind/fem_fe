import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getGradesByUser(userId: number): Observable<any[]> {
    const url = `${this.baseUrl}/api/grade/${userId}`;
    return this.http.get<any[]>(url);
  }

  downloadCertificate(enrollmentId: number, studentId: number): Observable<Blob> {
    const eId = encodeURIComponent(String(enrollmentId));
    const sId = encodeURIComponent(String(studentId));
    const url = `${this.baseUrl}/api/grade/certificate?enrollmentId=${eId}&studentId=${sId}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  downloadGradeReport(studentId: number): Observable<Blob> {
    const sId = encodeURIComponent(String(studentId));
    const url = `${this.baseUrl}/api/grade/report?studentId=${sId}`;
    return this.http.get(url, { responseType: 'blob' });
  }

}
