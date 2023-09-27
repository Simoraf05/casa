import { Component } from '@angular/core';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent {
  title: string = 'Accueil';
  item: string = 'Agents';
  active_item: string = 'agent';
}
