import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Adminor';
  currentRoute: string = '';
  bodyClass: string;
  constructor(private router: Router) {
    this.bodyClass = 'app';
  }

  ngOnInit() {

  }
}
