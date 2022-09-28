import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherChartsComponent } from './another-charts.component';

describe('AnotherChartsComponent', () => {
  let component: AnotherChartsComponent;
  let fixture: ComponentFixture<AnotherChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnotherChartsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnotherChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
