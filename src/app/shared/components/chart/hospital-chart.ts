import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './hospital-chart.html',
  styleUrl: './hospital-chart.css',
})
export class HospitalChart {
  @Input() chartType = '';
  @Input() labels: string[] = [];
  @Input() values: number[] = [];
}
