import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: '',
    family: '',
    age: 1,
    race: '',
    food: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };


  constructor(private http: HttpClient) { }

  // Méthodes http
  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/inscription', user, this.noAuthHeader);
  }
  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authentification', authCredentials, this.noAuthHeader);
  }

  updateProfil(user: User) {
    return this.http.post(environment.apiBaseUrl + '/profilUtilisateur', user);
  }

  getUserProfil() {
    return this.http.get(environment.apiBaseUrl + '/profilUtilisateur');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }


  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

}