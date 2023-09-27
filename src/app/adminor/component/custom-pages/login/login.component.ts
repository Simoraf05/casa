
import { Component } from '@angular/core';
import { AuthService } from 'src/app/adminor/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private autService: AuthService) { }

  login() {
    if (this.email == '') {
      alert('email required')
      return
    }
    if (this.password == '') {
      alert('password required')
      return
    }

    this.autService.loginWithEmail(this.email, this.password)
    this.email = ''
    this.password = ''
  }


}