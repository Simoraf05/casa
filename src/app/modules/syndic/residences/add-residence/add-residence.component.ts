import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Uuid4Service } from 'src/app/holder/service/uuid4.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/modules/services/services.service';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.scss']
})
export class AddResidenceComponent {
  title: string = 'Accueil';
  item: string = 'Syndic';
  active_item: string = 'residences';
  residence_name: string = '';
  nbr_lots: string = '';
  adresse1: string = '';
  adresse2: string = '';
  city_name: string = '';
  payload: any = {};
  payloadConfirmation: any = {};
  residence: any = {};

  constructor(private http: HttpClient, private uuid: Uuid4Service, private datePipe: DatePipe, private route: Router,private service:ServicesService) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authorization_token')?.replace(/"/g, '')}`
    })
  };
  addResidence() {
    this.payload = {
      'adresse_1': this.adresse1,
      'adresse_2': this.adresse2,
      'city_name': this.city_name,
      'nbr_lots': this.nbr_lots,
      'residence_name': this.residence_name,
      'residence_id': this.uuid.generateUuid(),
    }

    this.http.post('api-syndic/residence/add', this.payload, this.httpOptions).subscribe((data1: any) => {
      this.residence = data1
      console.log(data1);
      this.payloadConfirmation = {
        "end_date": data1.end_date,
        "residence_id": data1.residence_id,
        "start_date": data1.start_date
      };
  
      this.http.post('api-syndic/exercice/confirm', this.payloadConfirmation, this.httpOptions).subscribe((data2: any) => {
        console.log(data2)
        this.service.setSharedData(data2)
        this.route.navigate(['/module/residence/list-residences'])
      }, err => {
        console.log(err.message)
      }
      )
    }, err => {
      console.log(err.message)
    })
  }
}
