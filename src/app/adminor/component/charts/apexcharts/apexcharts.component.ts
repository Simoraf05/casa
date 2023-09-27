import { Component } from '@angular/core';
import * as chartData from 'src/app/adminor/shared/data/apex';

@Component({
  selector: 'app-apexcharts',
  templateUrl: './apexcharts.component.html',
  styleUrls: ['./apexcharts.component.scss'],
})
export class ApexchartsComponent {
  public RandomData = chartData.ApexRandomData;
  public BarData = chartData.BarData;
  public ApexChartData = chartData.ApexChartData;
  public StackedBarData = chartData.StackedBarData;
}
