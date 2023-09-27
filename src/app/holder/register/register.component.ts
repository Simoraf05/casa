import { Component } from '@angular/core';
import { AuthService } from 'src/app/holder/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userName: string = '';
  email: string = '';
  password: string = '';
  Cpassword: string = '';
  registrationStatus: string | null = null;

  constructor(private authService: AuthService) { }



  register() {
    if (this.email === '' || this.password === '') {
      alert('Email and password are required');
      return;
    }
    if (this.password !== this.Cpassword) {
      alert('Passwords do not match');
      return;
    }

    this.authService
      .registerWithEmail(
        this.email,
        this.password,
      )

      .then(() => {
        this.userName = '';
        this.email = '';
        this.password = '';
        this.Cpassword = '';
      })
      .catch((error) => {
        this.registrationStatus = `Registration failed: ${error.message}`;
      });
  }
  googleSignIn(){
    this.authService.googleSignIn()
  }
}
