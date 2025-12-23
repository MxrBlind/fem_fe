import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  getCurrentUserProfile(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/api/user/me");
  }

  updateCurrentProfile(id: number, data: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + "/api/user/" + id + "/profile", data);
  }

  updateCurrentProfilePassword(id: number, data: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + "/api/user/" + id + "/profile/password", data);
  }

}
