import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { ChartComponent } from '../chart/chart.component';

@Component({
  standalone: true,
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  imports: [NgFor, NgIf, ChartComponent]
})
export class ChartsComponent {
  title = 'Charts';

  charts: { id: number; data: string }[] = [
    { id: 1, data: 'data1' },
    { id: 2, data: 'data2' },
    { id: 3, data: 'data3' }
  ];
}
