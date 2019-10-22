import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  userDetails: User;
  errorMessage: string;
  success: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfil().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  updateProfile(profilForm : NgForm){
    console.log(this.userDetails);
    this.userService.updateProfil(profilForm.value).subscribe(
      res => {
        this.success = "Profil mis à jour avec succès !";
      },
      err => {
        this.errorMessage = err.error.join('<br>');
      }
    );

  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/connexion']);
  }
}
