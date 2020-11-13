import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private authenticationService : AuthenticationService
    ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      Name:['',Validators.required],
      Email:['',[Validators.required,Validators.email]],
      Password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(100)]]
  });

  // get return url from route parameters or default to '/'
  // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}


  // convenience getter for easy access to form fields
  get sf() { 
   return this.signUpForm.controls; 
}

onSubmit() {
  this.submitted = true;
console.log("DATA: \n" + this.sf.Email.value+ " - " +this.sf.Name.value + " - " + this.sf.Password.value);

 // stop here if form is invalid
 if (this.signUpForm.invalid) {
  return;
}

this.loading = true;
const resp = this.authenticationService.signUp(this.sf.Name.value, this.sf.Email.value,this.sf.Password.value)
  .pipe(first())
  .subscribe( data => {
    console.log("from onSubmit in signupComp : " + this.returnUrl +"blogger");
    
    this.router.navigate([this.returnUrl+"blogger"]);
},
error => {
    this.error = error;
    this.loading = false;
});
  console.log("Response : " + resp);
  
console.log("Back to Sign p ts");
// this.router.navigate([this.returnUrl+"blogger"]);

}
}
