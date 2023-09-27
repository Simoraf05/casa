import { Component } from '@angular/core';

@Component({
  selector: 'app-syndic',
  templateUrl: './syndic.component.html',
  styleUrls: ['./syndic.component.scss']
})
export class SyndicComponent {
  title: string = 'Accueil';
  item: string = 'Syndic';
  active_item: string = 'syndic';
}
