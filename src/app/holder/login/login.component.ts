import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/holder/service/auth.service';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isGoogleButtonDisabled: boolean = false;
  isAuthenticated: boolean = false;
  email: string = '';
  password: string = '';
  error: boolean = false;
  isLoading: boolean = false;

  constructor(private autService: AuthService, private route: Router) { }

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
    this.isLoading = this.autService.isLoading;
    this.email = ''
    this.password = ''
  }

  googleSignIn() {
    this.isGoogleButtonDisabled = true; // Disable the button
    this.autService.googleSignIn()
      .then(() => {
        // Authentication successful
        this.isAuthenticated = true;
        this.isGoogleButtonDisabled = false; // Re-enable the button after authentication
        this.isLoading = this.autService.isLoading;

      })
      .catch((error) => {
        if (error.code === 'auth/popup-closed-by-user') {
          // User closed the popup
          this.isGoogleButtonDisabled = false; // Re-enable the button
          // Handle this scenario as needed (e.g., show a message)
        } else {
          // Handle other authentication errors
          console.error('Authentication error:', error);
        }
      });
  }

  ngOnInit() {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
    if (this.route.url === '/holder/login' || this.route.url === '/holder/register') {
      localStorage.removeItem('token');
      localStorage.removeItem('partner');

    }

  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  handleBeforeUnload = () => {
    if (this.isAuthenticated) {
      this.isAuthenticated = false;
      this.isGoogleButtonDisabled = false;
    }
  };

}