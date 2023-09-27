import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(
    window.innerWidth
  );
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

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
  }

  ngOnDestroy() {
    this.unsubscriber.next;
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  MENUITEMS: Menu[] = [
    {
      title: 'Dashboard',
      selected: false,
      icon: 'home',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        {
          path: '/adminor/dashboard/sales-dashboard',
          title: 'Sales Dashboard',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/dashboard/marketing-dashboard',
          title: 'Marketing Dashboard',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/dashboard/app-dashboard',
          title: 'App Dashboard',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/dashboard/lms-dashboard',
          title: 'Lms Dashboard',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/dashboard/analytics-dashboard',
          title: 'Analytics Dashboard',
          type: 'link',
          selected: false,
        },
      ],
    },
    //landing-page

    //advance ui
    {
      title: 'Advance UI',
      selected: false,
      icon: 'box',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        {
          path: '/adminor/advanced-ui/accordion',
          title: 'accordion',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/advanced-ui/carousel',
          title: 'carousel',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/advanced-ui/collapse',
          title: 'collapse',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/advanced-ui/modal',
          title: 'modal',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/advanced-ui/counters',
          title: 'Counter',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/advanced-ui/sweet-alert',
          title: 'sweet-alert',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/advanced-ui/ratings',
          title: 'ratings',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/advanced-ui/search',
          title: 'Search',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/advanced-ui/userlist',
          title: 'Userlist',
          type: 'link',
          selected: false,
        },
        {
          title: 'Blog-pages',
          type: 'sub',
          active: false,
          Menusub: true,
          children: [
            {
              path: '/adminor/advanced-ui/Blog-pages/Blog',
              title: 'Blog',
              type: 'link',
            },
            {
              path: '/adminor/advanced-ui/Blog-pages/Blog-details',
              title: 'Blog-details',
              type: 'link',
            },
            {
              path: '/adminor/advanced-ui/Blog-pages/edit-post',
              title: 'Edit-post',
              type: 'link',
            },
          ],
        },
      ],
    },

    {
      path: '/adminor/landing-page',
      icon: 'zap',
      title: 'Landing Page',
      type: 'external',
      badgeClass:
        'badge bg-dark br-5 side-badg, selected: falsee blink-text pb-1',
      badgeValue: 'New',
    },

    

    {
      title: 'Elements',
      selected: false,
      icon: 'database',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        {
          path: '/adminor/elements/alerts',
          title: 'Alerts',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/elements/buttons',
          title: 'Buttons',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/elements/dropdowns',
          title: 'Dropdowns',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/elements/avatar',
          title: 'Avatar',
          type: 'link',
          selected: false,
        },

        {
          path: '/adminor/elements/list-group',
          title: 'List group',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/elements/tags',
          title: 'Tags',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/elements/toast',
          title: 'Toast',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/elements/pagination',
          title: 'Pagination',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/elements/navigation',
          title: 'Navigation',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/elements/typography',
          title: 'Typography',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/elements/Popover',
          title: 'Popover',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/elements/progress',
          title: 'Progress',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/elements/spinners',
          title: 'Spinner',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/elements/breadcrumbs',
          title: 'Breadcrumbs',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/elements/badges',
          title: 'Badges',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/elements/media-object',
          title: 'Media Objects',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/elements/tooltip',
          title: 'ToolTip',
          type: 'link',
          selected: false,
        },

        {
          path: '/adminor/elements/thumbnails',
          title: 'Thumnails',
          type: 'link',
          selected: false,
        },
      ],
    },

    {
      title: 'Apps',
      selected: false,
      icon: 'download',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        {
          path: '/adminor/apps/cards',
          title: 'Cards',
          type: 'link',
          selected: false,
        },
     
        {
          path: '/adminor/apps/content-scrollbar',
          title: 'Content Scrollbar',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/apps/range-slider',
          title: 'Range Slider',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/apps/calendar',
          title: 'Calender',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/apps/contacts',
          title: 'Contacts',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/apps/image-compare',
          title: 'Image Compare',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/apps/notification',
          title: 'Notification',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/apps/widget-notification',
          title: 'Widgets Notification',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/apps/treeview',
          title: 'Treeview',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/apps/widgets',
          title: 'Widgets',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/apps/map-leaflet',
          title: 'Leaflet Maps',
          type: 'link',
        },
        {
          title: 'Mails',
          type: 'sub',
          active: false,
          Menusub: true,
          children: [
            { path: '/adminor/apps/mail/chat', title: 'chat', type: 'link' },
            {
              path: '/adminor/apps/mail/mail',
              title: 'Mail',
              type: 'link',
            },
            {
              path: '/adminor/apps/mail/mail-compose',
              title: 'Mail-Compose',
              type: 'link',
            },
            {
              path: '/adminor/apps/mail/mail-setting',
              title: 'Mail-settings',
              type: 'link',
            },

            { path: '/adminor/apps/mail/read-mail', title: 'read-mail', type: 'link' },
          ],
        },
        {
          title: 'File Manager',
          type: 'sub',
          active: false,
          Menusub: true,
          children: [
            {
              path: '/adminor/apps/file-manager/file-manager',
              title: 'File Manager',
              type: 'link',
            },
            {
              path: '/adminor/apps/file-manager/file-manager-list',
              title: 'File Manager List',
              type: 'link',
            },
            {
              path: '/adminor/apps/file-manager/file-manager-details',
              title: 'File Manager Details',
              type: 'link',
            },
            {
              path: '/adminor/apps/file-manager/file-attachments',
              title: 'File Manager Attachements',
              type: 'link',
            },
          ],
        },
      ],
    },
    {
      title: 'Forms',
      selected: false,
      icon: 'file',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        {
          path: '/adminor/forms/advanced-forms',
          title: 'advanced-forms',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/forms/form-elements',
          title: 'Form Elements',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/forms/form-layouts',
          title: 'Form Layouts',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/forms/form-wizards',
          title: 'Form wizard',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/forms/form-validation',
          title: 'Form Validation',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/forms/form-sizes',
          title: 'Form sizes',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/forms/form-editors',
          title: 'form-editors',
          type: 'link',
          selected: false,
        },
      ],
    },
    {
      title: 'Charts',
      selected: false,
      icon: 'slack',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        {
          path: '/adminor/charts/apex-charts',
          title: 'Apex-charts',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/charts/chartjs',
          title: 'Chart-js',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/charts/e-charts',
          title: 'Echarts',
          type: 'link',
          selected: false,
        },
      ],
    },

    {
      title: 'Pages',
      selected: false,
      icon: 'layers',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        {
          path: '/adminor/pages/profile',
          title: 'Profile',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/pages/edit-profile',
          title: 'Edit profile',
          type: 'link',
          selected: false,
        },

        {
          path: '/adminor/pages/about-us',
          title: 'About Us',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/pages/company-history',
          title: 'Company History',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/pages/crypto',
          title: 'Crypto ',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/pages/terms-condition',
          title: 'Terms Condition',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/pages/settings',
          title: 'Settings',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/pages/invoice',
          title: 'Invoice',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/pages/pricing',
          title: 'Pricing ',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/pages/panel',
          title: 'Panel',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/pages/gallery',
          title: 'Gallery',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/pages/Todotask',
          title: 'TOdotask',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/pages/faqs',
          title: 'FAQS',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/pages/empty-page',
          title: 'Empty Page',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/switcher-1',
          title: 'Switcher-1',
          type: 'link',
          selected: false,
        },
        {
          title: 'Tables',
          selected: false,
          icon: 'slack',
          type: 'sub',
          Menusub: true,
          active: false,
          children: [
            {
              path: '/adminor/pages/tables/basic-table',
              title: 'Basic table',
              type: 'link',
              selected: false,
            },
            {
              path: '/adminor/pages/tables/data-tables',
              title: 'Data tables',
              type: 'link',
              selected: false,
            },
            {
              path: '/adminor/pages/tables/edit-tables',
              title: 'Edit tables',
              type: 'link',
              selected: false,
            },
          ],
        },
      ],
    },
    {
      title: 'Icons',
      selected: false,
      icon: 'wind',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        {
          path: '/adminor/icons/font-awesome',
          title: 'Font Awesome',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/icons/materialdesign-icons',
          title: 'Material Design Icons',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/icons/simpleline-icons',
          title: 'Simple Line Icons',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/icons/feather-icons',
          title: 'Feather Icons',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/icons/Ionic-Icons',
          title: 'lonic-Icons',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/icons/flag-icons',
          title: 'Flag Icons',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/icons/pe7-icons',
          title: 'pe7 Icons',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/icons/themify-icons',
          title: 'Themify Icons',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/icons/typicons-icons',
          title: 'Typicons Icons',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/icons/weather-icons',
          title: 'Weather Icons',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/icons/bootstrap-icons',
          title: 'Bootstrap Icons',
          type: 'link',
          selected: false,
        },
      ],
    },

    {
      title: 'E-commerce',
      selected: false,
      icon: 'shopping-cart',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        {
          path: '/adminor/ecommerce/products',
          title: 'Products',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/ecommerce/product-details',
          title: 'Product Details',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/ecommerce/cart',
          title: 'Cart',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/ecommerce/check-out',
          title: 'check-out',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/ecommerce/wish-list',
          title: 'Wish List',
          type: 'link',
          selected: false,
        },
      ],
    },

    {
      title: 'Utilities',
      selected: false,
      icon: 'underline',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        {
          path: '/adminor/utilities/Background',
          title: 'Background',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/utilities/borders',
          title: 'Borders',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/utilities/display',
          title: 'Display',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/utilities/flex',
          title: 'Flex',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/utilities/height',
          title: 'Height',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/utilities/margin',
          title: 'Margin',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/utilities/padding',
          title: 'Padding',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/utilities/position',
          title: 'Position',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/utilities/width',
          title: 'Width',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/utilities/extras',
          title: 'Extras',
          type: 'link',
          selected: false,
        },
      ],
    },

    {
      title: 'Custom Pages',
      selected: false,
      icon: 'target',
      type: 'sub',
      Menusub: true,
      active: false,
      children: [
        {
          path: '/adminor/custompages/login',
          title: 'Login',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/custompages/register',
          title: 'Register',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/custompages/forgot-password',
          title: 'Forgot Password',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/custompages/lockscreen',
          title: 'Lock-screen',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/custompages/underconstruction',
          title: 'Under Construction',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/custompages/error401',
          title: 'Error-401',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/custompages/error403',
          title: 'Error-403',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/custompages/error404',
          title: 'Error-404',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/custompages/error500',
          title: 'Error-500',
          type: 'link',
          selected: false,
        },
        {
          path: '/adminor/custompages/error503',
          title: 'Error-503',
          type: 'link',
          selected: false,
        },
      ],
    },
  ];

  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
