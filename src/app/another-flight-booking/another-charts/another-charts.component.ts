import { Component } from '@angular/core';

@Component({
  selector: 'app-another-charts',
  templateUrl: './another-charts.component.html',
  styleUrls: ['./another-charts.component.css']
})
export class AnotherChartsComponent {
  title = 'Another Charts';

  charts: { id: number; data: string }[] = [
    { id: 1, data: 'data1' },
    { id: 2, data: 'data2' },
    { id: 3, data: 'data3' }
  ];
}
