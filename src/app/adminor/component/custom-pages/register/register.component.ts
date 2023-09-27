import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/adminor/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  email: string='';
  password: string='';
  Cpassword: string='';

  constructor(private autService : AuthService){}
  ngOnInit(){}



  register(){
    if(this.email == ''){
      alert('email required')
      return
    }
    if(this.password == ''){
      alert('password required')
      return
    }
        if(this.password !== this.Cpassword){
      alert('password not match')
      return
    }

    this.autService.registerWithEmail(this.email,this.password)
    this.email=''
    this.password=''
  }
}
