import { AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoDataService } from '../shared/services/demo-data.service';

import 'anychart';

@Component({
  standalone: true,
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  imports: [CommonModule]
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
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

  ngOnDestroy(): void {
    this.chart.dispose();
    this.chart = null;
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
