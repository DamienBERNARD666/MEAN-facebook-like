import { Component, OnInit } from '@angular/core';
import { ChatService } from '../shared/chat.service';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';
import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { Message } from '../shared/message.model';

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
  private messageArray: string[] = [];
  private messageArrayDB: Message[];

  private isTyping: boolean = false;

  constructor(private chatService : ChatService, private userService: UserService, private router: Router) { 

    this.chatService.receivedTyping().subscribe((bool => {
      this.usernameTyping= bool.user;
      this.isTyping = bool.isTyping;
    }));
  }

  ngOnInit() {
    // this.email ='1234@gmail.com';
    this.chatService.joinRoom(this.chatService.room);
    this.messageArrayDB = [];
  
    this.chatService.getAllMessagesSend().subscribe(
      res => {
        let messageSend : Message;
        let i;
        for(i in res)
        {
          messageSend = new Message();
          messageSend.sender = res[i]['sender'];
          messageSend.receiver = res[i]['receiver'];
          messageSend.message = res[i]['message'];
          messageSend.roomID = res[i]['roomID'];
          messageSend.date = res[i]['date'];
                    // console.log(messageSend.roomID);
          // console.log(this.chatService.room);
          if (messageSend.roomID == this.chatService.room) {
            this.messageArrayDB.push(messageSend);
            this.messageArrayDB.sort((b, a) => new Date(b.date).getTime() - new Date(a.date).getTime());

          }

        }
      },
      err => {
        console.log(err);
      }
    );

    


    this.chatService.getAllMessages().subscribe(
      res => {
        // console.log(res);
        let message : Message;
        let i;
        for(i in res)
        {
          message = new Message();
          message.sender = res[i]['sender'];
          message.receiver = res[i]['receiver'];
          message.message = res[i]['message'];
          message.roomID = res[i]['roomID'];
          message.date = res[i]['date'];
          // console.log(message.roomID);
          // console.log(this.chatService.room);
          if (message.roomID == this.chatService.room) {
            this.messageArrayDB.push(message);
            this.messageArrayDB.sort((b, a) => new Date(b.date).getTime() - new Date(a.date).getTime());
          }

        }
        // console.log(this.messageArrayReceveid);
      },
      err => {
        console.log(err);
      }
    );

    

    this.chatService.getMessage().subscribe((message: string, user: string) => {
      // console.log(message);
      this.messageArray.push(message);
      // console.log(this.messageArray);
    
    });
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
    // console.log(this.chatService.contactEmail);
    // console.log(this.username.email)
    this.chatService.sendMessage({ sender: this.username.email, receiver: this.chatService.contactEmail, message: this.message, room: this.chatService.room});
  
    this.message = '';
    this.isTyping= false;
  }
  typing(){
    this.chatService.typing({ user: this.username.fullName, roomID: this.chatService.room});
  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/connexion']);
  }
}
