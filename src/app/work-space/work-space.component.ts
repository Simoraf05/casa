import { Component, ElementRef, ViewChild } from '@angular/core';
import { PartnerService } from 'src/app/holder/service/partner.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment'; // Import the correct environment file

@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.scss']
})
export class WorkSpaceComponent {
  @ViewChild('Canvas') Canvas: ElementRef | any;
  @ViewChild('myCanvas') myCanvas: ElementRef | any;


  constructor(private route: Router, private partnerService: PartnerService) { }
  partners: any[] = [];
  agent: any[] = [];
  ngOnInit() {
    const storedData = localStorage.getItem('partner');
    if (storedData) {
      this.partners = JSON.parse(storedData);
    }
    if (this.route.url === '/holder/home') {
      localStorage.removeItem('partner_active')
    }
    console.log(this.partners)
  }
  splitPartnerId(partnerId: string): string {
    if (partnerId) {
      const parts = partnerId.split('-');
      if (parts.length >= 5) {
        return parts[4];
      }
    }
    return ''; // Return a default value or handle the error as needed
  }
  showAddTravail = false;
  showCofirmation = false;

  // ... other properties and methods ...


  toggleAddTravail() {
    this.showAddTravail = !this.showAddTravail;
  }
  showConfirme: boolean = false; // Set this to true to initially show the ConfirmeComponent

  // ...

  hideConfirmeComponent(_event: void) {
    this.showConfirme = false; // Set the flag to hide the ConfirmeComponent
  }

  closeAddTravail() {
    this.showAddTravail = false;
  }
  connect(agentId: string) {
    this.partnerService.connect(agentId).subscribe((data: any) => {
      if (data.response_code === "0100") {
        console.log(data)
        this.showConfirme = true;
        this.agent = data;
        console.log(this.agent);
        localStorage.setItem('agentId_selected', agentId);
      } else {
        const link = document.createElement('a');
        //       link.target = '_blank';

        console.log("production=>" + environment.production);

        // Determine the correct domain based on the environment
        const domain = environment.production
          ? data.redirect_url.replace(/^(https?:\/\/)?(localhost(:\d+)?)/i, '')
          : 'localhost:4200'; // Use 'localhost' if not in production

        // Construct the new URL based on the environment
        const newURL = environment.production
          ? `${domain}/redirect-page/${data.redirect_token}`
          : `http://${domain}/redirect-page/${data.redirect_token}`;

        link.href = newURL;
        link.click();
        // Store necessary data in localStorage
        localStorage.setItem('redirect_token', data.redirect_token);
        localStorage.setItem('partner_active', JSON.stringify(data));
      }
    });
  }






  toggleForm() {
    this.partnerService.toggleShowModules();
  }
}
