import { Component } from '@angular/core';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  title: string = 'Accueil';
  item: string = 'Admin';
  active_item: string = 'admin';
}
