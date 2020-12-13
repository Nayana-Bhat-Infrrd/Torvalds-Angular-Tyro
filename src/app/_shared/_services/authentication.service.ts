import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/_shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    const loginData = { email: username, password: password };
    return this.http.post<any>(`${environment.apiUrl}/login/`, loginData, { observe: 'response' })
      .pipe(map(user => {
        var result = this.setLocalStorage(user);
      }))
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  signUp(username: string, email: string, password: string) {
    const signupData = { name: username, email: email, password: password };
    return this.http.post<any>(`${environment.apiUrl}/register/`, signupData, { observe: 'response' })
      .pipe(map(user => {
        this.setLocalStorage(user);
      }))
  }

  setLocalStorage(user): any {
    if (JSON.stringify(user.body.result.message)) {
      const data = { 'token': user.headers.get('authorization') }
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
      return data;
    }
    else {
      console.log("In error : " + JSON.stringify(user.body.error.message));
      throw new Error(JSON.stringify(user.body.error.message))
    }
  }

}
