import { Component, OnInit, Renderer2, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LayoutService } from 'src/app/adminor/shared/services/layout.service';
import { Menu, NavService } from 'src/app/adminor/shared/services/nav.service';
import { SwitcherService } from 'src/app/adminor/shared/services/switcher.service';
import { PartnerService } from '../../service/partner.service';
import { environment } from 'src/environments/environment'; // Import the correct environment file

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private body: HTMLBodyElement | any = document.querySelector('body');
  public isCollapsed = true;
  showModules: boolean = false;
  agent: any[] = [];
  showConfirme: boolean = false;

  connectedAgentId: string = '';

  constructor(
    private layoutService: LayoutService,
    public navServices: NavService,
    public modalService: NgbModal,
    public SwitcherService: SwitcherService,
    public router: Router,
    private partnerService: PartnerService,
    private renderer: Renderer2,
  ) {

  }
  currentUrl: boolean = false;
  contact_name: string = '';
  partners: any[] = [];
  location: string = '';

  ngOnInit(): void {
    this.toggleSidebarVisibility();
    if (this.router.url === '/holder/home') {
      this.currentUrl = true;
    }
    const storagedData = localStorage.getItem('partner');
    if (storagedData) {
      this.partners = JSON.parse(storagedData);
    }
    this.location = this.router.url;
    // Retrieve the JSON data from localStorage
    const storedData = localStorage.getItem('partner_active');

    if (storedData) {
      try {
        // Parse the JSON data
        const parsedData = JSON.parse(storedData);

        // Check if the parsed data contains partner_id
        if (parsedData && parsedData.contact_name) {
          this.contact_name = parsedData.contact_name;
          console.log('contact_name:', this.contact_name);
        } else {
          //console.error('partner_id not found in parsed data');
        }
      } catch (error) {
        console.error('Error parsing JSON data:', error);
      }
    } else {
      //console.error('partner_active not found in localStorage');
    }

    const parseObjectString = localStorage.getItem('parse');

    if (parseObjectString) {
      // Parse the 'parse' object string into a JavaScript object
      const parseObject = JSON.parse(parseObjectString);

      // Access the 'agent_id' property from the 'parse' object
      this.connectedAgentId = parseObject.agent_id;

      // Now 'agentId' contains the 'agent_id' value
      console.log('Agent ID:', this.connectedAgentId);
    }
  }

  toggleSidebar() {
    if ((this.navServices.collapseSidebar = true)) {
      document.querySelector('body')?.classList.toggle('sidenav-toggled');
    }
  }

  toggleSidebarNotification() {
    this.layoutService.emitSidebarNotifyChange(true);
  }

  toggleSwitcher() {
    this.SwitcherService.emitChange(true);
    document.querySelector('body')?.classList.remove('sidenav-toggled-open');
  }

  getPartner(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;

    this.partnerService.connect(selectedValue).subscribe((data: any) => {
      this.agent = data;
      if (data.response_code === "0100") {
        this.showModules = this.partnerService.toggleShowModules();
        this.partnerService.toggleShowModules();
        console.log(this.agent)
        localStorage.setItem('agentId_selected', (selectedValue))
      } else {
        console.log(data)
        const link = document.createElement('a');
        link.target = '_blank';
        link.href = this.router.serializeUrl(this.router.createUrlTree(['/module/accueil']));
        localStorage.setItem('redirect_token', data.redirect_token)
        localStorage.setItem('partner_active', JSON.stringify(data))

        link.click();
      }
    });
  }
  sidebar: boolean = true;

  toggleSidebarVisibility() {
    const screenWidth = window.innerWidth;

    // Check if the screen width is less than 1020px
    if (screenWidth < 1020) {
      this.sidebar = false;
    } else {
      this.sidebar = true;
    }
  }
  displayPartner: boolean = false;

  addPartner() {
    this.displayPartner = true;
  }

  hideConfirmeComponent(_event: void) {
    this.showConfirme = false; // Set the flag to hide the ConfirmeComponent
  }
  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    if (selectedValue === 'Ajouter un partner') {
      // Handle the "Ajouter un partner" option click here
      this.addPartner();
    } else {
      // Handle the selection of a specific option here
      this.connect(selectedValue);
    }
  }

  connect(agentId: string) {
    this.partnerService.connect(agentId).subscribe((data: any) => {
      if (data.response_code === "0100") {
        console.log(data)
        this.showConfirme = true;
        this.agent = data;
      } else {
        const link = document.createElement('a');
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
        this.connectedAgentId = agentId;
        console.log(this.connectedAgentId)
        // Store necessary data in localStorage
        localStorage.setItem('redirect_token', data.redirect_token);
        localStorage.setItem('partner_active', JSON.stringify(data));
      }
    });
  }

}
