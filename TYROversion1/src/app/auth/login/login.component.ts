import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import { AuthenticationService } from 'src/app/_shared/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedIn: boolean = false;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public toastr:ToastrService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  // convenience getter for easy access to form fields
  get f() {
    // console.log("from get f() : controls " + this.loginForm.controls + " " + 
    // this.loginForm.contains.arguments[0]);    
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log("DATA: \n" + this.f.email.value + " - " + this.f.password.value);

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          // console.log("from onSubmit in loginComp : " + this.returnUrl + "blogger");
          // console.log("data from loginComp : "  + data.token);
          // console.log("headers : " + data.headers.keys());
          
          this.loggedIn = true;
          this.router.navigate([this.returnUrl + "blogger"]);
          this.toastr.success('Congrats!!!','Login Successfull',{
            positionClass:'toast-top-center',
            timeOut:1500,
          })
        },
        error => {
         this.toastr.error('Invalid Credentials','Try Again',{
           positionClass:'toast-top-center',
           timeOut:1500,
         })

          this.error = error;
          this.loading = false;
        });

  }

}
