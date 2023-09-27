import { Component } from '@angular/core';

@Component({
  selector: 'app-residence',
  templateUrl: './residence.component.html',
  styleUrls: ['./residence.component.scss']
})
export class ResidenceComponent {
  title: string = 'Accueil';
  item: string = 'Residences';
  active_item: string = 'residence';
}
