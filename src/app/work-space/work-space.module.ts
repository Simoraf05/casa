import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartjsModule } from 'ng-chartjs';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkSpaceRoutingModule } from './work-space-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { LayoutModulesComponent } from '../modules/shared/layout-modules/layout-modules.component';
import { ConfirmeComponent } from './confirme/confirme.component';

@NgModule({
  declarations: [
    LayoutModulesComponent
  ],
  imports: [
    NgScrollbarModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkSpaceRoutingModule,
    NgChartjsModule,
    NgChartsModule,
    NgxEchartsModule,
    NgApexchartsModule,
    SlickCarouselModule,
    CarouselModule,
  ],
  exports: [

  ],
})
export class WorkSpaceModule { }
