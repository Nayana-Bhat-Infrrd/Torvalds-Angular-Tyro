import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthguardGuard } from 'src/app/core/_helper/authguard.guard';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [

  {
    path: '', redirectTo: 'blogger', pathMatch: "full", canActivate: [AuthguardGuard]

  },
  {
    path: 'auth', component: AuthComponent,
    // canActivateChild: [AuthguardGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ]

  },

  {
    path: 'blogger',
    loadChildren: () => import('./blogger/blogger.module').then(m => m.BloggerModule),
    canActivate: [AuthguardGuard]
  },
  {
    path: 'error', component: ErrorComponent
  },
  // otherwise redirect to home
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
