import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalChart } from './hospital-chart';

describe('HospitalChart', () => {
  let component: HospitalChart;
  let fixture: ComponentFixture<HospitalChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalChart],
    }).compileComponents();

    fixture = TestBed.createComponent(HospitalChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
