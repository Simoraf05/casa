import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GoogleAuthProvider } from '@angular/fire/auth'
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  [x: string]: any;
  authState: any;
  isLoading: boolean = false;

  constructor(private afu: AngularFireAuth, private route: Router, private http: HttpClient) {
    this.afu.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }
  isAuthenticated: boolean = false;
  // all firebase getdata functions

  get isUserAnonymousLoggedIn(): boolean {
    return this.authState !== null ? this.authState.isAnonymous : false;
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }

  get currentUserName(): string {
    return this.authState['email'];
  }

  get currentUser(): any {
    return this.authState !== null ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if (this.authState !== null && !this.isUserAnonymousLoggedIn) {
      return true;
    } else {
      return false;
    }
  }


  registerWithEmail(email: string, password: string) {
    return this.afu
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const payload = {
          'firebase_token': this.authState.user._delegate.accessToken,
          'holder_displayname': '',
          'holder_id': this.authState.user.uid,
          'holder_mail': this.authState.user._delegate.email,
          "holder_imgurl": "",
        };

        console.log(this.authState);
        console.log('payload', payload)
        this.http.post('api-manager/holder/authenticate', payload)
          .subscribe((data: any) => {
            console.log('API response:', data);
            if (data.response_code == '0000') {
              localStorage.removeItem('partner');
              localStorage.removeItem('token');
              localStorage.setItem('token', data.authorization_token)
              this.route.navigate(["holder/home"])
            }
            else (
              alert(data)
            )
          });
      })
      .catch((_error) => {
        console.log(_error);
        throw _error;
      });
  }

  googleSignIn() {
    this.isLoading = true; // Set loading to true when login starts

    return this.afu.signInWithPopup(new GoogleAuthProvider)
      .then((user) => {
        this.authState = user;
        const payload = {
          'firebase_token': this.authState.user._delegate.stsTokenManager.accessToken,
          'holder_displayname': this.authState.user._delegate.displayName,
          'holder_id': this.authState.user.uid,
          'holder_mail': this.authState.user._delegate.email,
          "holder_imgurl": this.authState.user._delegate.photoURL,
        };

        this.isAuthenticated = true;
        console.log(this.authState);
        console.log('payload', payload)
        this.http.post('api-manager/holder/authenticate', payload)
          .subscribe((data: any) => {
            console.log('API response:', data);
            if (data.response_code == '0000') {
              localStorage.removeItem('partner');
              localStorage.removeItem('token');
              localStorage.setItem('token', data.authorization_token)
              localStorage.setItem('partner', JSON.stringify(data.partners))
              this.route.navigate(["holder/home"])
            }
            else (
              alert(data)
            )
          });
      }, err => {
        console.log(err.message)
      }
      ).finally(() => {
        this.isLoading = false; // Set loading back to false when login is complete
      });
  }

  loginWithEmail(email: string, password: string) {
    this.isLoading = true; // Set loading to true when login starts
    return this.afu
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        console.log(this.authState.user);
        const payload = {
          'firebase_token': this.authState.user._delegate.stsTokenManager.accessToken,
          'holder_displayname': '',
          'holder_id': this.authState.user.uid,
          'holder_mail': this.authState.user._delegate.email,
          'holder_phone': '',
          'holder_imgurl': this.authState.user._delegate.photoURL,
        };
        this.http.post('api-manager/holder/authenticate', payload)
          .subscribe((data: any) => {
            console.log('API response:', data);
            if (data.response_code == '0000') {
              localStorage.removeItem('partner');
              localStorage.removeItem('token');

              localStorage.setItem('token', data.authorization_token);
              localStorage.setItem('partner', JSON.stringify(data.partners));
              this.route.navigate(["holder/home"]);
            } else {
              alert(data);
            }
          });
      })
      .catch((_error) => {
        Swal.fire({
          text: "les informations sont incorrectes",
        });
        throw _error;
      })
      .finally(() => {
        this.isLoading = false; // Set loading back to false when login is complete
      });
  }


  singout(): void {
    this.afu.signOut();
    this.route.navigate(['/holder/login']);
  }

  forgotPassword(email: string) {
    this.afu.sendPasswordResetEmail(email).then((res: any) => {
      Swal.fire({
        text: "A password reset link has been sent to your email address",
      })
    }, err => {
      console.log(err)
      Swal.fire({
        text: "An error occurred while attempting to reset your password",
      })
    })
  }

  confirmPasswordReset(code: string, newPassword: string): Promise<void> {
    return this.afu.confirmPasswordReset(code, newPassword)
      .then((res: any) => {
        console.log(res)
      })
      .catch((error) => {
        // Password reset failed
        // Handle the error, e.g., by showing an error message to the user
        console.error('Password reset error:', error);
        throw error; // You can re-throw the error for additional handling if needed
      });
  }

}
