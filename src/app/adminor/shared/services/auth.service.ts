import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GoogleAuthProvider } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  [x: string]: any;
  authState: any;
  constructor(private afu: AngularFireAuth, private route: Router, private http: HttpClient) {
    this.afu.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

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
          "holder_phone" : '',
          "holder_imgurl": "",
        };

        console.log(this.authState);
        console.log('payload', payload)
        this.http.post('/manager/holder/authenticate', payload)
          .subscribe((data: any) => {
            console.log('API response:', data);
          });
        //this.route.navigate(["/pages/profile"])
      })
      .catch((_error) => {
        console.log(_error);
        throw _error;
      });
  }

  googleSignIn() {
    return this.afu.signInWithPopup(new GoogleAuthProvider)
      .then((user) => {
        this.authState = user;
        const payload = {
          'firebase_token': this.authState.user._delegate.accessToken,
          'holder_displayname': this.authState.user._delegate.displayName,
          'holder_id': this.authState.user.uid,
          'holder_mail': this.authState.user._delegate.email,
          "holder_phone" : '',
          "holder_imgurl": this.authState.user._delegate.photoURL,
        };

        console.log(this.authState);
        console.log('payload', payload)
        this.http.post('/manager/holder/authenticate', payload)
          .subscribe((data: any) => {
            console.log('API response:', data);
          });
      }, err => {
        console.log(err.message)
      }
      )
  }

  loginWithEmail(email: string, password: string) {
    return this.afu
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        console.log(this.authState.user)

        //this.route.navigate(["/pages/profile"])
      })
      .catch((_error) => {
        console.log(_error);
        throw _error;
      });
  }

  singout(): void {
    this.afu.signOut();
    this.route.navigate(['/login']);
  }
}
