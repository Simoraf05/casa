import { Component } from '@angular/core';

@Component({
  selector: 'app-espace-travail',
  templateUrl: './espace-travail.component.html',
  styleUrls: ['./espace-travail.component.scss']
})
export class EspaceTravailComponent {
  title: string = 'Accueil';
  item: string = 'Accueil';
  active_item: string = 'espace de travail';
}
