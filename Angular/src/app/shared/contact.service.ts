import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, private router: Router) { }

  retrieveAllPossibleContacts()
  {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    })
    return this.http.get(environment.apiBaseUrl + '/all', { headers: headers });
  }
 
  retrieveAllSavedContact()
  {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    })
    return this.http.get(environment.apiBaseUrl + '/contacts', { headers: headers });
  }

  deleteContact(contact: Contact)
  {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    })
    return this.http.delete(environment.apiBaseUrl + '/contacts/' + contact.contact, {headers: headers});
  }

  
  addContact(email: string)
  {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    })
    return this.http.put(environment.apiBaseUrl + '/contacts', { email: email }, {headers: headers});
  }

}






