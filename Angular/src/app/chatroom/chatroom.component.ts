import { Component, OnInit } from '@angular/core';
import { ChatService } from '../shared/chat.service';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  private username: User;
  private usernameTyping: String;
  private email: String;
  private message: String;
  private messageArray: String[] = [];
  private isTyping: boolean = false;
  constructor(private chatService : ChatService, private userService: UserService) { 
 

    this.chatService.receivedTyping().subscribe((bool => {
      this.usernameTyping= bool.user;
      this.isTyping = bool.isTyping;
    }));
  }

  ngOnInit() {
    // this.email ='1234@gmail.com';
    this.chatService.getMessage().subscribe((message: string) => {
      // console.log(message);
      this.messageArray.push(message);
      // console.log(this.messageArray);
    
    })
    this.userService.getUserProfil().subscribe(
      res => {
        this.username = res['user'];
      },
      err => { 
        console.log(err);
        
      }
    );
  
  }

  sendMessage(){
    this.chatService.sendMessage({ user: this.username.fullName, message: this.message});
    this.message = '';
    this.isTyping= false;
  }
  typing(){
    this.chatService.typing(this.username.fullName);
  }

}
