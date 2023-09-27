import { Injectable } from '@angular/core';
import { Uuid4Service } from './uuid4.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(private uuid: Uuid4Service, private http: HttpClient, private location: Location) { }
  uuidV4 = this.uuid.generateUuid();
  dataInit = {};
  showModules: boolean = false;

  private Partner: any[] = [];

  data2: {} | undefined;
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },

    )
  };
  toggleShowModules() {
    this.showModules = !this.showModules;
    return this.showModules
  }

  init(
    adresse_1: string,
    adresse_2: string,
    city_name: string,
    contact_mail: string,
    contact_name: string,
    contact_phone: string,
    partner_ice: string,
    partner_title: string,
    partner_type: string
  ): Observable<any> { // Return an observable
    const payload = {
      "adresse_1": adresse_1,
      "adresse_2": adresse_2,
      "city_name": city_name,
      "contact_mail": contact_mail,
      "contact_name": contact_name,
      "contact_phone": contact_phone,
      "partner_ice": partner_ice,
      "partner_id": this.uuidV4,
      "partner_title": partner_title,
      "partner_type": partner_type
    };


    return this.http.post('api-manager/partner/init', payload, this.httpOptions)

  }



  confirmation(partner_id: string):Observable<any> {
    const payload2 = {
      "partner_id": partner_id
    };
    return this.http.post('api-manager/partner/confirm', payload2, this.httpOptions)
  }

  getPartner(agentId: string): Observable<any> {
    return this.http.post('api-manager/partner/connect', `Bearer ${localStorage.getItem('token')}`);
  }

  connect(partner_id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json' 
    });
  
    const requestOptions = { headers: headers };
  
    return this.http.post('api-manager/partner/connect', { "agent_id" : partner_id }, requestOptions);
  }

}
