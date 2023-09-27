import { Component, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavService } from 'src/app/holder/service/nav.service';

@Component({
  selector: 'app-agent-detail',
  templateUrl: './agent-detail.component.html',
  styleUrls: ['./agent-detail.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(100%)' }), // Slide in from right
        animate('500ms ease-out', style({ transform: 'translateX(0)' })), // Slide to center
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)' }), // Slide in from left
        animate('500ms ease-out', style({ transform: 'translateX(0)' })), // Slide to center
      ]),
    ]),
  ],

})
export class AgentDetailComponent {
  constructor(
    private route: ActivatedRoute,
    config: NgbCarouselConfig,
    private navService: NavService,
    private router: Router,
    private cdRef: ChangeDetectorRef

  ) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.updateSlidesToShow.bind(this));
      // Initial check for the screen width
      this.updateSlidesToShow();
    }
  }
  agentData: any;
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const agentDataParam = params['agentData'];

      if (agentDataParam) {
        try {
          this.agentData = JSON.parse(agentDataParam);
          console.log('Received agent data:', this.agentData);
        } catch (error) {
          console.error('Error parsing agent data:', error);
        }
      }
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Get the current route path
        const currentRoute = this.router.url;

        // Update selectedCard based on the current route path
        this.selectedCard = this.slides.find((slide) => slide.path === currentRoute);
      }
    });
  }

  currentSlideIndex = 0;
  slides = [
    {
      icone: "fa-solid fa-house",
      title: "ACCUEIL",
      color: '#9A3B3B',
      path: `/module/accueil`,
    },
    {
      icone: "fa-solid fa-water",
      title: "ADMIN",
      color: '#E2C799',
      path: `/module/admin`,

    },
    {
      icone: "fa-brands fa-instagram",
      title: "AGENTS",
      color: '#793FDF',
      path: `/module/agents`,

    },
    {
      icone: "fa-brands fa-discord",
      title: "SYNDIC",
      color: '#FFC436',
      path: `/module/syndic`,

    },
    {
      icone: "fa-regular fa-bell",
      title: "RESIDENCE",
      color: '#CEDEBD',
      path: `/module/residence`,

    },
    {
      icone: "bx bx-user tx-24",
      title: "TASKS",
      color: '#5C5470',
      path: `/module/tasks`,

    },
    {
      icone: "fa-solid fa-gear",
      title: "gear",
      color: '#45FFCA'

    },
    {
      icone: "fa-brands fa-algolia",
      title: "algolia",
      color: '#D8B4F8'

    },
  ];

  slidesToShow: number = 5;

  ngOnDestroy() {
    window.removeEventListener('resize', this.updateSlidesToShow.bind(this));
  }
  updateSlidesToShow() {
    // Get the current screen width
    const screenWidth = window.innerWidth;

    // Update slidesToShow based on the screen width
    if (screenWidth < 600) {
      this.slidesToShow = 2;
    } else if (screenWidth >= 600 && screenWidth < 900) {
      this.slidesToShow = 3;
    } else if (screenWidth >= 900 && screenWidth < 1020) {
      this.slidesToShow = 4;
    } else {
      this.slidesToShow = 5;
    }

    // Optionally, you can trigger a re-render or update the slider here
    // to reflect the new value of slidesToShow.
  }
  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % (this.slides.length - this.slidesToShow + 1);
  }
  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + (this.slides.length - this.slidesToShow + 1)) % (this.slides.length - this.slidesToShow + 1);
  }
  selectedSlideIndex: number = 0; // Initialize with a default value
  selectedCard: any | null = null; // Property to store selected card data

  selectItem(index: number | null, item: string) {
    if (index !== null) {
      this.selectedSlideIndex = index;
      this.selectedCard = this.slides[this.currentSlideIndex + index];
      // Trigger change detection explicitly
      this.cdRef.detectChanges();

      // Navigate to the route specified by the 'item' parameter
      this.router.navigate([item]);
    }

    // Call the 'selectedMenue' method of the 'navService' with the title of the selected card
    this.navService.initializeMenuItems();
  }

  isSelected(title: string): boolean {
    return this.selectedCard  === title;
  }
  muneValue() {
    this.navService.initializeMenuItems()
  }
}
