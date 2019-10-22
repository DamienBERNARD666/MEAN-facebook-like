import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../shared/contact.service';
import { Contact } from '../shared/contact.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];
  possibleContacts: Object;
  selected: string;
  
  constructor(private router: Router, private contactService: ContactService, private userService: UserService) { }

  ngOnInit() {
    this.retrieveContactsList();
    this.constructContactsList();
  }



  retrieveContactsList() {
    this.contactService.retrieveAllSavedContact().subscribe(
      res => {
        let contact: Contact;
        let i;
        this.contacts = [];
        for (i in res) {
          contact = new Contact();
          contact.main = res[i]['main'];
          contact.contact = res[i]['contact'];
          this.contacts.push(contact);
        }
      },
      err => {
        sessionStorage.removeItem("token");
        this.router.navigate(['/connexion']);
      }
    )
  }


    constructContactsList()
    {
      this.contactService.retrieveAllPossibleContacts().subscribe(
        res => {
          this.possibleContacts = res;
        },
        err => {
          sessionStorage.removeItem("token");
          this.router.navigate(['/connexion']);
        }
      )
    }

  addContact(selected) {
    if (selected == undefined || selected.toLowerCase() == "none")
      return;
    this.contactService.addContact(selected).subscribe(
      res => {
        this.retrieveContactsList();
        this.constructContactsList();
      },
      err => {
        sessionStorage.removeItem("token");
        this.router.navigate(['/connexion']);
      }
    )
  }


  deleteOne(contact: Contact) {
    let contacts = JSON.parse(JSON.stringify(this.contacts));
    for (var i = 0; i < contacts.length; i++) {
      if (contacts[i].contact == contact.contact) {
        contacts.splice(i, 1);
        // Object.
        break;
      }
    }

    this.contacts = contacts;
    this.contactService.deleteContact(contact).subscribe(
      res => {
        this.retrieveContactsList();
      },
      err => {
        sessionStorage.removeItem("token");
        this.router.navigate(['/connexion']);
      }
    )
  }



  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/connexion']);
  }
}
