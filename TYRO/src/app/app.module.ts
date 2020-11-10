import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ReadPostComponent } from './blogger/read-post/read-post.component';
import { NewPostComponent } from './blogger/new-post/new-post.component';
import { BookmarkComponent } from './blogger/bookmark/bookmark.component';

@NgModule({
  declarations: [
    AppComponent,
    BookmarkComponent,
    NewPostComponent,
    ReadPostComponent,
    AuthComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
