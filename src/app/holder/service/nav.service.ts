import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';


export interface Menu {
  headTitle?: string;
  headTitle2?: string;
  path?: any;
  title?: string;
  icon?: string;
  type?: string;
  badgeValue?: string;
  badgeClass?: string;
  active?: boolean;
  selected?: boolean;
  bookmark?: boolean;
  children?: Menu[];
  Menusub?: boolean;
  target?: boolean;
  items?: any;
}

@Injectable({
  providedIn: 'root',
})
export class NavService {
  menue_selected: string = 'ACCUEIL';
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(
    window.innerWidth
  );
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;
  public MENUITEMS: Menu[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, 'resize')
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
      });
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.initializeMenuItems(); // Call the function to update menu items
      }
    });
    this.initializeMenuItems();

  }
  initializeMenuItems() {
    const currentUrl = this.router.url
    if (currentUrl.startsWith(`/module/accueil`)) {
      this.MENUITEMS = [
        {
          title: 'ACCUEIL',
          selected: false,
          icon: 'home',
          type: 'sub',
          Menusub: true,
          active: false,
          children: [
            {
              path: '/module/accueil/espaceDeTravail',
              title: 'Espace de travail',
              type: 'link',
              selected: false,
            },
          ],
        },
      ];
    } else if (currentUrl.startsWith(`/module/admin`)) {
      this.MENUITEMS = [
        {
          title: 'ADMIN',
          selected: false,
          icon: 'home',
          type: 'sub',
          Menusub: true,
          active: false,
          children: [
            {
              path: '/module/admin/utilisateur',
              title: 'Utilisateur',
              type: 'link',
              selected: false,
            },
          ],
        },
      ];
    } else if (currentUrl.startsWith(`/module/agents`)) {
      this.MENUITEMS = [
        {
          title: 'AGENTS',
          selected: false,
          icon: 'home',
          type: 'sub',
          Menusub: true,
          active: false,
          children: [
            {
              path: '/module/agents/agent',
              title: 'Agent',
              type: 'link',
              selected: false,
            },
          ],
        },
      ];
    } else if (currentUrl.startsWith(`/module/syndic`)) {
      this.MENUITEMS = [
        {
          title: 'SYNDIC',
          selected: false,
          icon: 'home',
          type: 'sub',
          Menusub: true,
          active: false,
          children: [
            {
              path: '/module/syndic/dashboard',
              title: 'dashboard',
              type: 'link',
              selected: false,
            },
            {
              path: '/module/syndic/residences',
              title: 'residences',
              type: 'link',
              selected: false,
            },
          ],
        },
      ];
    } else if (currentUrl.startsWith(`/module/residence`)) {
      this.MENUITEMS = [
        {
          title: 'RESIDANCES',
          selected: false,
          icon: 'home',
          type: 'sub',
          Menusub: true,
          active: false,
          children: [
            {
              path: '/module/residence/list-residences',
              title: 'RESIDANCE',
              type: 'link',
              selected: false,
            },
          ],
        },
      ];
    } else if (currentUrl.startsWith(`/module/tasks`)) {
      this.MENUITEMS = [
        {
          title: 'TASKS',
          selected: false,
          icon: 'home',
          type: 'sub',
          Menusub: true,
          active: false,
          children: [
            {
              path: '/module/tasks/tasks',
              title: 'TASKS',
              type: 'link',
              selected: false,
            },
          ],
        },
      ];
    }  // Add more conditions for other URLs

    // Update the BehaviorSubject with the new MENUITEMS
    this.items.next(this.MENUITEMS);
  }
  /*ngOnInit() {
    if (this.currentUrl === `/module/accueil`) {
      MENUITEMS: Menu[] = [{

        title: 'ACCUEIL',
        selected: false,
        icon: 'home',
        type: 'sub',
        Menusub: true,
        active: false,
        children: [
          {
            path: '/module/accueil/espaceDeTravail',
            title: 'Espace de travail',
            type: 'link',
            selected: false,
          },
        ],

      }];
    } else if (this.currentUrl === `/module/admin`) {
      MENUITEMS: Menu[] = [
        {
          title: this.menue_selected,
          selected: false,
          icon: 'home',
          type: 'sub',
          Menusub: true,
          active: false,
          children: [
            {
              path: '/module/admin/utilisateur',
              title: 'Utilisateur',
              type: 'link',
              selected: false,
            },
          ],
        }]

    } else if (this.currentUrl === `/module/agents`) {
      MENUITEMS: Menu[] = [{
        title: this.menue_selected,
        selected: false,
        icon: 'home',
        type: 'sub',
        Menusub: true,
        active: false,
        children: [
          {
            path: '/module/agents/agent',
            title: 'Agent',
            type: 'link',
            selected: false,
          },
        ],

      }]
    } else if (this.currentUrl === `/module/syndic`) {
      MENUITEMS: Menu[] = [{
        title: this.menue_selected,
        selected: false,
        icon: 'home',
        type: 'sub',
        Menusub: true,
        active: false,
        children: [
          {
            path: '/module/syndic/dashboard',
            title: 'SYNDIC',
            type: 'link',
            selected: false,
          },
          {
            path: '/module/syndic/residences',
            title: 'SYNDIC',
            type: 'link',
            selected: false,
          },
        ],

      }]
    } else if (this.currentUrl === `/module/residence`) {
      MENUITEMS: Menu[] = [{
        title: this.menue_selected,
        selected: false,
        icon: 'home',
        type: 'sub',
        Menusub: true,
        active: false,
        children: [
          {
            path: '/modele/residence/residence',
            title: 'RESIDANCE',
            type: 'link',
            selected: false,
          },
        ],

      }]
    } else if (this.currentUrl === `/module/tasks`) {
      MENUITEMS: Menu[] = [{
        title: this.menue_selected,
        selected: false,
        icon: 'home',
        type: 'sub',
        Menusub: true,
        active: false,
        children: [
          {
            path: '/modele/tasks/tasks',
            title: 'TASKS',
            type: 'link',
            selected: false,
          },
        ],

      }]
  }
}*/

  ngOnDestroy() {
    this.unsubscriber.next;
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }




  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
