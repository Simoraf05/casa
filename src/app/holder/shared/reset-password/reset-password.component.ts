import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  code: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Get the code from the URL parameters
    this.route.queryParams.subscribe((params) => {
      this.code = params['oobCode'];
    });
  }
  resetPassword() {
    if (this.newPassword === this.confirmPassword) {
      // Call confirmPasswordReset when confirming the password reset
      this.authService.confirmPasswordReset(this.code, this.newPassword)
        .then((res: any) => {
          console.log(res)
          this.router.navigate(['/holder/login'])
        })
        .catch((error) => {
          Swal.fire({
            text: "An error occurred while attempting to reset your password",
          })
          console.log(error)
        });

    } else {
      Swal.fire({
        text: "Password don't match !",
      })
    }
  }
}
