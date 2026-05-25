import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTableTitle } from './page-table-title';

describe('PageTableTitle', () => {
  let component: PageTableTitle;
  let fixture: ComponentFixture<PageTableTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTableTitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTableTitle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
