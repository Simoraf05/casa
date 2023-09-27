import { Component, ElementRef, ViewChild } from '@angular/core';
import { TimeInterface } from 'angular-cd-timer';
import { interval } from 'rxjs';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.scss'],
})
export class CountersComponent {
  
  public counter1 = 1;
  source = interval(0.2);
  subscribe = this.source.subscribe(() => {
    this.counter1++;
    if (this.counter1 == 2569) {
      this.subscribe.unsubscribe();
    }
  });
  timerInfo: string | any;

  @ViewChild('days', { static: true })
  days!: ElementRef;
  @ViewChild('hours', { static: true })
  hours!: ElementRef;
  @ViewChild('minutes', { static: true })
  minutes!: ElementRef;
  @ViewChild('seconds', { static: true })
  seconds!: ElementRef;

  onComplete(data: any) {
    data.elt.nativeElement.classList.add('muteCount');
  }

  onTick(data: TimeInterface) {
    this.timerInfo = '';
  }

  onStart(data: any) {}
}
