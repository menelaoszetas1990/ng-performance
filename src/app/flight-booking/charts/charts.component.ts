import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements AfterViewInit {
  title = 'Charts';

  charts: { id: number; data: string }[] = [
    { id: 1, data: 'data1' },
    { id: 2, data: 'data2' },
    { id: 3, data: 'data3' }
  ];

  @ViewChild('cnt', { read: ViewContainerRef }) vC!: ViewContainerRef;

  async ngAfterViewInit() {
    const esm = await import('../chart/chart.component');
    const chartRef = this.vC.createComponent(esm.ChartComponent);
    chartRef.instance.id = this.charts[0].id;
    chartRef.instance.data = this.charts[0].data;
  }
}
