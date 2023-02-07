import { AfterViewInit, Component, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';

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

  @ViewChildren('cnt', { read: ViewContainerRef }) vCs!: QueryList<ViewContainerRef>;

  async ngAfterViewInit() {
    const esm = await import('../chart/chart.component');
    /*const chartRef = this.vCs.createComponent(esm.ChartComponent);
    chartRef.instance.id = this.charts[0].id;
    chartRef.instance.data = this.charts[0].data;*/

    this.vCs.map((viewContainerRef: ViewContainerRef, index: number) => {
      const chartRef = viewContainerRef.createComponent(esm.ChartComponent);
      chartRef.instance.id = this.charts[index].id;
      chartRef.instance.data = this.charts[index].data;
    });
  }
}
