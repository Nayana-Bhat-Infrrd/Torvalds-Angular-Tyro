import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin: boolean = true;
  isSignUp: boolean = false;

  constructor() {
    // console.log("in auth const");
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    // let elem: HTMLElement = document.getElementById('Login');
    // elem.setAttribute("style", "border-bottom: 2px solid blue;");
    // console.log("In auth login");
    this.isLogin = true;
    this.isSignUp = false;
  }

  onSignUp(): void {
    // let elem1: HTMLElement = document.getElementById('Signup');
    // elem1.setAttribute("style", "border-bottom: 2px solid blue;");
    // console.log("In auth signUp");
    this.isSignUp = true;
    this.isLogin = false;
  }
}
