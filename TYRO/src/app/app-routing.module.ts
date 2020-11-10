import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardGuard } from 'src/app/core/_helper/authguard.guard';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
 
  { path : 'auth', component: AuthComponent,
    canActivate:[AuthguardGuard],
    canActivateChild:[AuthguardGuard],
    children: [
      { path : 'login', component: LoginComponent},
      { path: 'signup', component: SignupComponent},
    ]

  },
  // otherwise redirect to home
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
