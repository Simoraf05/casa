import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  forgotPassword() {
    this.auth.forgotPassword(this.email); // Pass the email as an argument
    console.log(this.email)
    //this.email = '';
  }
}
