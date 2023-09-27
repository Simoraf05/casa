import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Uuid4Service } from '../../holder/service/uuid4.service';
import { HttpClient } from '@angular/common/http';
import { PartnerService } from '../../holder/service/partner.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirme',
  templateUrl: './confirme.component.html',
  styleUrls: ['./confirme.component.scss']
})
export class ConfirmeComponent {
  partner_type: string = 'PHYSIQUE';
  partner_title: string = '';
  contact_name: string = '';
  partner_ice: string = '';
  contact_phone: string = '';
  contact_mail: string = '';
  adresse_1: string = '';
  adresse_2: string = '';
  city: string = '';
  err: boolean = false;
  partner_id: string = "";
  showModules: boolean = false;
  @Input() agent: any; // Input property to receive the agent data

  ngOnInit() {
    // Initialize the input fields with the agent data
    this.partner_type = this.agent.partner_type || 'PHYSIQUE';
    this.partner_title = this.agent.partner_title || '';
    this.contact_name = this.agent.contact_name || '';
    this.partner_ice = this.agent.partner_ice || '';
    this.contact_phone = this.agent.contact_phone || '';
    this.contact_mail = this.agent.contact_mail || '';
    this.adresse_1 = this.agent.adresse_1 || '';
    this.adresse_2 = this.agent.adresse_2 || '';
    this.city = this.agent.city_name || '';
    this.partner_id = localStorage.getItem('agentId_selected') || '';
    console.log(this.partner_id)
  }


  constructor(private uuid: Uuid4Service, private partnerService: PartnerService, private http: HttpClient, private route: Router) { }
  @Output() cancel = new EventEmitter<void>();

  onCancel() {
    this.cancel.emit(); // Emit the cancel event
  }



  confirmation() {
    this.partnerService.confirmation(this.partner_id).subscribe((res: any) => {
      if (res.response_code === "0100") {
        this.showModules = this.partnerService.toggleShowModules();
        localStorage.setItem('agentId_selected', this.partner_id);
      } else {
        const link = document.createElement('a');
        //link.target = '_blank';

        // Determine the correct domain based on the environment
        const domain = environment.production
          ? res.redirect_url.replace(/^(https?:\/\/)?(localhost(:\d+)?)/i, '')
          : 'localhost:4200'; // Use 'localhost' if not in production

        // Construct the new URL based on the environment
        const newURL = environment.production
          ? `${domain}/redirect-page/${res.redirect_token}`
          : `http://${domain}/redirect-page/${res.redirect_token}`;

        link.href = newURL;
        link.click();

        // Store necessary res in localStorage
        localStorage.setItem('redirect_token', res.redirect_token);
        localStorage.setItem('partner_active', JSON.stringify(res));
        window.location.reload();

      }

    });
  }

}
