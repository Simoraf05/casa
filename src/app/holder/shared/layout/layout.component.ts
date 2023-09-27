import { Component, HostListener } from '@angular/core';
import { Menu, NavService } from 'src/app/adminor/shared/services/nav.service';
import { SwitcherService } from 'src/app/adminor/shared/services/switcher.service';


@Component({
  selector: 'app-holder-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  public menuItems!: Menu[];
  constructor(
    public SwitcherService: SwitcherService,
    public navServices: NavService
  ) {
    this.navServices.items.subscribe((menuItems: any) => {
      this.menuItems = menuItems;
    });
  }

  ngOnInit() {
    document.querySelector('.slide-leftRTL')?.classList.add('d-none');
    document.querySelector('.slide-rightRTL')?.classList.add('d-none');
  }

  ngOnDestroy() {
    location.reload();
  }

  toggleSwitcherBody() {
    this.SwitcherService.emitChange(false);
  }
  scrolled: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 70;
  }
}
