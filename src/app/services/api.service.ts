import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { API_BASE_URL } from '../common/url.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  apiPath: string = API_BASE_URL;
  constructor(
    private http: HttpClient,
    private route: Router,
    private appService: AppService
  ) { }

  login(username: string, password: string, phoneNumber: string){
    return this.post(this.apiPath + 'auth/Login', {
      username : username,
      password: password,
      phoneNumber: phoneNumber
    })
  }

  logout(username: string, token: string){
    return this.post(this.apiPath + 'auth/logout'); //API to be implmented
  }


  get(url: string, headers:any = {}): Observable<any>{
    return this.http.get(url,{
      headers: new HttpHeaders(headers)
    })
  }

  post(url: string, data: any = {}): Observable<any>{
    return this.http
            .post<any>(url, data, {
              headers: new HttpHeaders({
                'Content-Type': 'application/json'
              })
            })
  }
}
