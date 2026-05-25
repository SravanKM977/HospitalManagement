import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-table-title',
  imports: [],
  templateUrl: './page-table-title.html',
  styleUrl: './page-table-title.css',
})
export class PageTableTitle {
  @Input() childTableTitle!: string;
}
