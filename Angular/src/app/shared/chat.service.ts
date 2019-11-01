import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket;
  room : string;
  contactEmail: string;

  constructor(private http : HttpClient) { 
    this.socket =  io.connect(environment.apiBaseUrlChat);
  }

  joinRoom(data) {
    this.socket.emit('join', data);
  }

  sendMessage(message) {
    this.socket.emit('message', message);
  }

  getMessage(){
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    })
  }

  getAllMessages(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    })
    return this.http.get(environment.apiBaseUrl + '/messagesReceived', {headers: headers});
  }


  getAllMessagesSend(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    })
    return this.http.get(environment.apiBaseUrl + '/messagesSend', {headers: headers});

  }



  newMessageReceived() {
    const observable = new Observable<{ user: String, message: String}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  typing(data) {
    this.socket.emit('typing', data);
  }

  enter(data){
    this.socket.emit('enter', data)
  }

  receivedTyping() {
    const observable = new Observable<{ user: String, isTyping: boolean}>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}