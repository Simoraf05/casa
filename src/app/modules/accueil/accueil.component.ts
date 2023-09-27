import { Component, HostListener, ChangeDetectorRef, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from 'src/app/holder/service/nav.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  screenWidth: boolean = window.innerWidth <= 991; // Initially set based on screen width
  selectedSlideIndex: number = 0; // Initialize with a default value
  selectedCard: any | null = null; // Property to store selected card data
  currentSlideIndex = 0;
  slidesToShow: number = 0;
  title: string = 'Accueil';
  item: string = 'Accueil';
  active_item: string = 'accueil';

  constructor(private cdRef: ChangeDetectorRef, private router: Router, private navService: NavService, private el: ElementRef, private renderer: Renderer2) {
    window.addEventListener('resize', this.onResize.bind(this));
  }
  ngOnInit(): void {
    this.updateClasses();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateClasses();
  }

  private updateClasses(): void {
    const windowWidth = window.innerWidth;
    const rowContainer = this.el.nativeElement.querySelector('.row');

    if (windowWidth > 1230) {
      this.renderer.addClass(rowContainer, 'row-cols-1');
      this.renderer.addClass(rowContainer, 'row-cols-md-2');
      this.renderer.addClass(rowContainer, 'row-cols-lg-3');
    } else {
      this.renderer.removeClass(rowContainer, 'row-cols-1');
      this.renderer.removeClass(rowContainer, 'row-cols-md-2');
      this.renderer.removeClass(rowContainer, 'row-cols-lg-3');
    }
  }

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

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % (this.slides.length - this.slidesToShow + 1);
  }
  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + (this.slides.length - this.slidesToShow + 1)) % (this.slides.length - this.slidesToShow + 1);
  }


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
