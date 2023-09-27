import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-redirect',
  templateUrl: './page-redirect.component.html',
  styleUrls: ['./page-redirect.component.scss']
})
export class PageRedirectComponent implements OnInit {
  redirectToken: string | null;

  constructor(private http: HttpClient, private route: Router,private router: ActivatedRoute) {
     this.redirectToken = this.router.snapshot.params['redirect-token'];
    console.log('redirectToken:'+this.redirectToken);
  }

  ngOnInit(): void {
    console.log('before redirect1');
    // Check if a redirect token is available
    if (this.redirectToken) {
      console.log('after redirect2');

      // Make the API call here
      this.http.post('/api-workspace/agent/parse', { "redirect_token": this.redirectToken }).subscribe((res: any) => {
        if (res.response_code === '0000') {
          console.log(res);
          const link = document.createElement('a');
          localStorage.setItem('parse', JSON.stringify(res));
          localStorage.setItem('authorization_token', JSON.stringify(res.authorization_token));

          this.route.navigate(['/module/accueil']);
        }
        else {
          console.log(res);
          Swal.fire({
            icon: 'error',
            text: 'Something went wrong!',
          })
        }
      });
    } else if (this.redirectToken === undefined) {
      Swal.fire({
        icon: 'error',
        text: 'Something went wrong!',
      })
      this.route.navigate(['/holder/home'])
    }
  }
}
