import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin: boolean;
 // isSignUp: boolean;

  constructor(
    private router : Router
  ) {
    
  }

  ngOnInit(): void {
    console.log(this.router.url);
    this.isLogin = this.router.url === "/auth/login" ? true : false ;
    //this.isSignUp = !this.isLogin;
  }

  onLogin(): void {
    // let elem: HTMLElement = document.getElementById('Login');
    // elem.setAttribute("style", "border-bottom: 2px solid blue;");
    // console.log("In auth login");

         this.isLogin = true;
         
  
  }

  onSignUp(): void {
    
   
    this.isLogin = false;
  }
}
