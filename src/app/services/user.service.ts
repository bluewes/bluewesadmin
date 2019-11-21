import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { APIService } from './api.service';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = new BehaviorSubject<any>(false);
  loggedIn : boolean = false;

  constructor(
    private router: Router,
    private apiService: APIService,    
  ) { }

  getUser(){
    const user = this.user.getValue();
    const token = localStorage.getItem('token');
    if(user && !token){
      this.user.next(false);
      this.logout({timeout: true});
      return false;
    }
    return this.user.getValue();
  }

  setUser(userInfo: any){
    if(this.loggedIn && userInfo.token == this.getUser().token)
      return;
    this.loggedIn = true;
    this.user.next(userInfo);
    localStorage.setItem('token',JSON.stringify(userInfo));    
  }

  login(username: string, password: string, phoneNumber: string = ''){
    return this.apiService.login(username, password, phoneNumber).subscribe((response: any)=>{
      if(response.token == null){
        alert("Incorrect Creds");
      } else {
        this.setUser({
          username: username,
          token: response.token
        })
        this.router.navigate(['dashboard']);
      }
    })
  }

  logout(options: {timeout?: boolean, redirect?: boolean} = {}){
    const{
      timeout = false,
      redirect = true
    } = options;
    if(this.getUser()){
      this.apiService.logout(this.getUser().username, this.getUser().token).subscribe((data:any)=>{
        console.log("logout response", data);
      })
    }
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.user.next(false);
    if(redirect && timeout){
        this.router.navigate(['/login'], {queryParams: {'inactivity': timeout}});
      } else if(redirect){
        this.router.navigate(['/login']);
    }  
  }
}
