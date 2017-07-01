import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IUser } from '../models/user.model';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AuthService {
  currentUser: IUser;
  headers = new Headers({'Content-Type': 'application/json'});
  options = new RequestOptions({headers: this.headers});
  constructor(private http: Http) {}

  // [user registration]
  createUser(email: string, password: string) {
    const body = {email: email, password: password};
    return this.http.post('/api/auth/register', JSON.stringify(body), this.options);
  }

  // [login]
  loginUser(userName: string, password: string) {
    const body = {username: userName, password: password};
    return this.http.post('/api/auth/login', JSON.stringify(body), this.options).do(res => {
      if (res) {
        this.currentUser = <IUser>res.json();
        localStorage.setItem('currentUser', res.json());
      }
    }).catch(err => {
      return Observable.of(false);
    }).finally(() => {
    });
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

}