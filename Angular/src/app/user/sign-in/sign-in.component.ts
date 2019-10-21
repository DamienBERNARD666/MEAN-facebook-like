import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  userModel: Object = {
    email: '',
    password: ''
  }
  errorMessage: string;

  constructor(private userService: UserService, private router: Router) { }
  model: object ={
    email :'',
    password:''
  };


  ngOnInit() {
    if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/profil');
  }
  onSubmit(form: NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/profil');
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }
}
