import { AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';

import { DemoDataService } from '../../shared/demo-data.service';

import 'anychart';

@Component({
  selector: 'app-another-chart',
  templateUrl: './another-chart.component.html',
  styleUrls: ['./another-chart.component.scss']
})
export class AnotherChartComponent implements OnInit, AfterViewInit {
  @Input() id = 0;
  @Input() data = 'data1';

  @ViewChild('container') container;

  chart: anychart.charts.Pie = null;

  constructor(private chartDataService: DemoDataService, private element: ElementRef, private ngZone: NgZone) {}

  ngOnInit(): void {
    // Default data set mapping, hardcoded here.
    this.chart = anychart.pie(this.chartDataService.getData(this.data));
  }

  ngAfterViewInit(): void {
    this.chart.container(this.container.nativeElement);
    this.chart.draw();
  }

  /*blink(): void {
    // Dirty Hack used to visualize the change detector
    // let originalColor = this.element.nativeElement.firstChild.style.backgroundColor;
    this.element.nativeElement.firstChild.style.backgroundColor = 'crimson';
    //              ^----- DOM-Element

    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.element.nativeElement.firstChild.style.backgroundColor = 'white';
      }, 1000);
    });
  }*/
}
