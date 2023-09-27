import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  title: string = 'Accueil';
  item: string = 'Tasks';
  active_item: string = 'tasks';
}
