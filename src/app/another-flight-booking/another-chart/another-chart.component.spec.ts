import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherChartComponent } from './another-chart.component';

describe('AnotherChartComponent', () => {
  let component: AnotherChartComponent;
  let fixture: ComponentFixture<AnotherChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnotherChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AnotherChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
