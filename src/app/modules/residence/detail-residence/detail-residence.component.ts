import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-detail-residence',
  templateUrl: './detail-residence.component.html',
  styleUrls: ['./detail-residence.component.scss']
})
export class DetailResidenceComponent {
  title: string = 'Accueil';
  item: string = 'Residences';
  residence: any = {}; 
  active_item: string = '';
  update: boolean = false;

  constructor(private service: ServicesService) { }

  ngOnInit() {
    const storedData = localStorage.getItem('residence_selected');
    this.residence = storedData ? JSON.parse(storedData) : null;;
    this.active_item = this.residence.residence_name;
  }

  updateResidence(){
    this.update = true;
  }
}
