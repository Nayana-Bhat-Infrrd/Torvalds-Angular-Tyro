import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/_shared/_services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  // convenience getter for easy access to form fields
  get sf() {
    return this.signUpForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log("DATA: \n" + this.sf.Email.value + " - " + this.sf.Name.value + " - " + this.sf.Password.value);

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    this.loading = true;
    const resp = this.authenticationService.signUp(this.sf.Name.value, this.sf.Email.value, this.sf.Password.value)
      .pipe(first())
      .subscribe(data => {
        this.router.navigate([this.returnUrl + "blogger"]);
        this.toastr.success('Congrats!!!','Signup Successfull',{
          positionClass:'toast-top-center',
          timeOut:1500,
        })
      },
        error => {
         
          this.error = error;
          this.loading = false;
        });

    // this.router.navigate([this.returnUrl+"blogger"]);

  }
}
