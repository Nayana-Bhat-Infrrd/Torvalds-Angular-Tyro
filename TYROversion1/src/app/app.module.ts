import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { JwtInterceptor } from './core/_helper/jwt.interceptor';
import { AuthguardGuard } from './core/_helper/authguard.guard';
import { ErrorComponent } from './error/error.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { MatSidenavModule } from '@angular/material/sidenav';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import {OverlayModule} from '@angular/cdk/overlay';
import { from } from 'rxjs';
import {ToastrModule} from 'ngx-toastr'
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignupComponent,
    LoginComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    FontAwesomeModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthguardGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },ToastrModule
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
