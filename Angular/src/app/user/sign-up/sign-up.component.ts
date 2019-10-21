import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  errorMessage: string;
  success: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.resetForm(form);
        this.success = true;
      },
      err => {
        if(err.status === 422) {
          this.errorMessage = err.error.join('<br>');
        }
        else {
          this.errorMessage = "Quelque chose cloche."
        }
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: '',
      family: '',
      age:1,
      race: '',
      food: ''
    };
    form.resetForm();
  }

}
