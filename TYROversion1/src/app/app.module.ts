import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { fakeBackendProvider } from './core/_helper/fake-backend';
import { JwtInterceptor } from './core/_helper/jwt.interceptor';
import { ErrorInterceptor } from './core/_helper/error.interceptor';
import { AuthguardGuard } from './core/_helper/authguard.guard';
import { DummyComponent } from './dummy/dummy.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignupComponent,
    LoginComponent,
    DummyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthguardGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    
        // provider used to create fake backend
        fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
