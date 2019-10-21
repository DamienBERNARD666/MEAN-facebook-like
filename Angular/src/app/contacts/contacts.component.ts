import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Contact } from '../contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  possibleContacts: Object;
  selected: string;
  newExternalContact: string;

  constructor(private userService: UserService, private router : Router) { }

  ngOnInit() {
  }


  
  retrieveContactsList()
  {
    this.userService.retrieveAll().subscribe(
      res => {
        let contact: Contact;
        let i;
        this.contacts = [];
        for(i in res)
        {
          contact = new Contact();
          contact.main = res[i]['main'];
          contact.contact = res[i]['contact'];
          this.contacts.push(contact);
        }
      },
      err => {
        sessionStorage.removeItem("token");
        this.router.navigate(['login']);
      }
    )
  }
}
