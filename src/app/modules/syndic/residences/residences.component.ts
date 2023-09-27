import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Uuid4Service } from 'src/app/holder/service/uuid4.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/modules/services/services.service';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.scss']
})
export class ResidencesComponent {
  title: string = 'Accueil';
  item: string = 'Syndic';
  active_item: string = 'residences';
  payload: any = {};
  payloadConfirmation: any = {};
  residence: any = [];
  authorization_token: string = '';
  date_start: string = '';
  date_end: string = '';

  constructor(private http: HttpClient, private uuid: Uuid4Service, private datePipe: DatePipe, private route: Router,private service:ServicesService) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authorization_token')?.replace(/"/g, '')}`
    })
  };
  ngOnInit() {
    const localStorageData = localStorage.getItem('parse');
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      this.authorization_token = parsedData.authorization_token;
    } else {
      console.error("Item 'parse' not found in localStorage");
    }
    this.getList()
    
  }

  getList(){
    const data = {
      "adresse_1": "string",
      "adresse_2": "string",
      "city_name": "string",
      "contact_mail_1": "string",
      "contact_mail_2": "string",
      "contact_mail_3": "string",
      "contact_name_1": "string",
      "contact_name_2": "string",
      "contact_name_3": "string",
      "contact_phone_1": "string",
      "contact_phone_2": "string",
      "contact_phone_3": "string",
      "latitude": "string",
      "longitude": "string",
      "nbr_lots": "string",
      "residence_id": "string",
      "residence_name": "string"
    }
    this.http.post('api-syndic/residence/list', data,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authorization_token')?.replace(/"/g, '')}`
      }
    }).subscribe((data: any) => {
      console.log(data);
      this.residence = data.items
      console.log(this.residence);
    }, (err: any) => {
      console.error(err.message);
    });
  }


  getResidence(residence_id:string){
    this.http.post('api-syndic/residence/get', {"residence_id":residence_id}, this.httpOptions).subscribe((data2: any) => {
      console.log(data2)
      localStorage.setItem('residence_selected',JSON.stringify(data2))
      this.route.navigate(['/module/residence/residence-details'])
    }, err => {
      console.log(err.message)
    }
    )
  }

  /*
    addResidence() {
      (async () => {
  
  
        const { value: formValues } = await Swal.fire({
          title: 'Multiple inputs',
          html: `
            <form>
            <div class='row'>
            <div class="form-outline col-6 mb-4">
              <label class="form-label" for="residence_name">residence_name</label>
              <input type="text" id='residence_name' class="form-control" />
            </div>
            </div>
  
  
              <div class='row'>
              <div class="form-outline col-6 mb-4">
              <label class="form-label" for="city_name">city_name</label>
              <input type="text" id='city_name' class="form-control" />
            </div>
  
            <div class="form-outline col-6 mb-4">
                <label class="form-label" for="nbr_lots">nbr_lots</label>
                <input type="text" id='nbr_lots' class="form-control" />
              </div>
              </div>
              <div class='row'>
                <div class="form-outline mb-4 col-6">
                  <label class="form-label" for="adresse_1">adresse_1</label>
                  <input type="text" id='adresse_1' class="form-control" />
                </div>
          
                <div class="form-outline mb-4 col-6">
                  <label class="form-label" for="adresse_2">adresse_2</label>
                  <input type="text" id='adresse_2' class="form-control" />
                </div>
              </div>
            </form>`,
          focusConfirm: false,
          preConfirm: () => {
            const adresse_1 = document.getElementById('adresse_1') as HTMLInputElement;
            const adresse_2 = document.getElementById('adresse_2') as HTMLInputElement;
            const city_name = document.getElementById('city_name') as HTMLInputElement;
            const nbr_lots = document.getElementById('nbr_lots') as HTMLInputElement;
            const residence_name = document.getElementById('residence_name') as HTMLInputElement;
  
            if (adresse_1 && adresse_2 && city_name && nbr_lots && residence_name) {
              return [
                this.payload = {
                  'adresse_1': adresse_1.value,
                  'adresse_2': adresse_2.value,
                  'city_name': city_name.value,
                  'nbr_lots': nbr_lots.value,
                  'residence_name': residence_name.value,
                  'residence_id': this.uuid.generateUuid(),
                },
  
                this.http.post('api-syndic/residence/add', this.payload, this.httpOptions).subscribe((data1: any) => {
                  this.residence = data1
                  console.log(data1);
                  (async () => {
                    const currentDate = new Date();
                    const currentYear = currentDate.getFullYear();
                    const firstDayOfYear = new Date(currentYear, 0, 1);
                    const firstDayOfYearString = this.datePipe.transform(firstDayOfYear, 'dd/MM/yyyy HH:mm:ss');
                    const { value: formValues } = await Swal.fire({
                      title: 'Multiple inputs',
                      html: `
                        <form>
                          <div class="row">
                            <div class="form-outline col-6 mb-4">
                              <label class="form-label" for="date_start">Start Date</label>
                              <input type="date" id="date_start" value="${firstDayOfYearString}" class="form-control" />
                            </div>
                            <div class="form-outline col-6 mb-4">
                              <label class="form-label" for="date_end">End Date</label>
                              <input type="date" id="date_end" class="form-control" />
                            </div>
                          </div>
                        </form>`,
                      focusConfirm: false,
                      preConfirm: () => {
                        this.date_start = (document.getElementById('date_start') as HTMLInputElement).value;
                        this.date_end = (document.getElementById('date_end') as HTMLInputElement).value;
                        const date_start_string = this.datePipe.transform(this.date_start, 'dd/MM/yyyy HH:mm:ss');
                        const date_end_string = this.datePipe.transform(this.date_end, 'dd/MM/yyyy HH:mm:ss');
                        console.log('Start Date:', date_start_string);
                        console.log('End Date:', date_end_string);
  
                        this.payloadConfirmation = {
                          "end_date": date_start_string,
                          "residence_id": data1.residence_id,
                          "start_date": date_end_string
                        };
                        this.http.post('api-syndic/exercice/confirm', this.payloadConfirmation, this.httpOptions).subscribe((data2: any) => {
                          console.log(data2)
                          this.route.navigate(['/modules/residence/list-residences'])
                        }, err => {
                          console.log(err.message)
                        }
                        )
                      }
                    });
                  })();
  
                }, err => {
                  console.log(err.message)
                }
                )
              ];
            } else {
              return Swal.fire(
                'Les champs sont obligatoires !',
                'question'
              );
            }
          }
        });
      })();
    }
  */
}
