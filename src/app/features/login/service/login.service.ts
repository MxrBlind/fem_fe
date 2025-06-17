import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  headers = new HttpHeaders({'Content-Type':'application/json', 'Accept':'application/json'});
  baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  loginUser(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/token', JSON.stringify(data), {headers: this.headers});
  }

  me(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/me');
  }

}
