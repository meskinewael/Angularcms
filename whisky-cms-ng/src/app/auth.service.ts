import { Injectable } from '@angular/core';
import {User} from './models/User';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl='http://localhost:3000/auth';
isAuthenticaded =false;

  constructor(private HttpClient : HttpClient) { }

  login(user: User){
    this.isAuthenticaded =true;
    return this.HttpClient.post<User>(`${this.baseUrl}/login`,user)
  }
  logout(){
    this.isAuthenticaded =false;
    return this.HttpClient.get<User>(`${this.baseUrl}/logout`)
  }
}
