import { Component } from '@angular/core';

@Component({
  selector: 'app-list-residences',
  templateUrl: './list-residences.component.html',
  styleUrls: ['./list-residences.component.scss']
})
export class ListResidencesComponent {
  title: string = 'Accueil';
  item: string = 'Residences';
  active_item: string = 'list des residence';
}
