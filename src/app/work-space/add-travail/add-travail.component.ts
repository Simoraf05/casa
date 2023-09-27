import { Component, EventEmitter, Output } from '@angular/core';
import { Uuid4Service } from '../../holder/service/uuid4.service';
import { HttpClient } from '@angular/common/http';
import { PartnerService } from '../../holder/service/partner.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-travail',
  templateUrl: './add-travail.component.html',
  styleUrls: ['./add-travail.component.scss']
})
export class AddTravailComponent {
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

  constructor(private uuid: Uuid4Service, private partnerService: PartnerService, private http: HttpClient, private route: Router) { }

  ngOnInit() { }

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
  uuidV4 = this.uuid.generateUuid();

  showModules: boolean = false;


  closeShowModules() {
    this.showModules = false;
  }

  module: string = '';
  Modules: any[] = [];
  partner_id: string = '';
  selectedModules: string[] = [];
  partners: any[] = [];
  existingData: any[] = [];

  onSubmit() {
    this.partnerService.init(
      this.adresse_1,
      this.adresse_2,
      this.city,
      this.contact_mail,
      this.contact_name,
      this.contact_phone,
      this.partner_ice,
      this.partner_title,
      this.partner_type
    ).subscribe((data: any) => {
      this.Modules = data;
      this.partner_id = data.partner_id;
      console.log(data)
      this.existingData = JSON.parse(localStorage.getItem('partner') || '[]');

      if (!Array.isArray(this.existingData)) {
        this.existingData = [];
      }

      const newDataArray = [data, ...this.existingData];

      localStorage.setItem('partner', JSON.stringify(newDataArray));
      this.showModules = this.partnerService.toggleShowModules();
      this.partnerService.toggleShowModules();

    }, (error: any) => {
      if (error.error.response_message === 'MAX Workspaces') {
        Swal.fire({
          icon: 'error',
          text: error.error.response_message,
        })
      }
    });
  }
  init() {

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







  onCheckboxChange(item: any) {
    if (item.selected) {
      // Checkbox is checked, add the value to the selectedModules array
      this.selectedModules.push(item.module_name);
    } else {
      // Checkbox is unchecked, remove the value from the selectedModules array
      const index = this.selectedModules.indexOf(item.module_name);
      if (index !== -1) {
        this.selectedModules.splice(index, 1);
      }
    }
    // You can view the selected values in the console for testing
    console.log(this.selectedModules);
  }

}
