import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
name: string = "Some name";
isLogin : boolean = true;
isSignUp : boolean = false;
// @ViewChild() child:LoginComponent;
  constructor() { 
    console.log("in auth const");
    
  }

  ngOnInit(): void {
  }

  onLogin(): void{
    console.log("In auth login");
    this.isLogin = true;
    this.isSignUp = false;
  }

  onSignUp(): void{
    console.log("In auth signUp");
    this.isSignUp = true;
    this.isLogin = false;
  }
}
