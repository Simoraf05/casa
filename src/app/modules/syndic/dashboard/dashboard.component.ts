import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  title: string = 'Accueil';
  item: string = 'Syndic';
  active_item: string = 'dashboard';
}
