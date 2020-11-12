import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardGuard } from 'src/app/core/_helper/authguard.guard';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
// import { DummyComponent } from './dummy/dummy.component';

const routes: Routes = [
  
  {
    path: '', redirectTo:'blogger', pathMatch: "full" , canActivate: [AuthguardGuard]
    
  },
  // {
  //   path: 'dummy', component: DummyComponent , canActivate: [AuthguardGuard]
  // },

  { path : 'auth', component: AuthComponent,
    canActivateChild:[AuthguardGuard],
    children: [
      { path : 'login', component: LoginComponent},
      { path: 'signup', component: SignupComponent},
    ]

  },

  { 
    path: 'blogger' ,
    loadChildren : () => import('./blogger/blogger.module').then(m => m.BloggerModule),
    canActivate: [AuthguardGuard]
  },
    
    // otherwise redirect to home
  { path: '**', redirectTo: 'blogger' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
