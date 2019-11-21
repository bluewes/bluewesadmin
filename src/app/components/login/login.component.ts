import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from "@angular/forms";
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('formRef',{static : false}) formRef: ElementRef;
  @ViewChild('forgotRef',{static : false}) forgotRef: ElementRef;
  @ViewChild('f', {static : false}) loginForm : NgForm;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
  }

  login(){
    this.userService.login(this.loginForm.value.username, this.loginForm.value.password, this.loginForm.value.phoneNumber);
  }
}
