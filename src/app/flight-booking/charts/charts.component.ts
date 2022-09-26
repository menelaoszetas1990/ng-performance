import { Component } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  title = 'Charts';

  charts: { id: number; data: string }[] = [
    { id: 1, data: 'data1' },
    { id: 2, data: 'data2' },
    { id: 3, data: 'data3' }
  ];
}
