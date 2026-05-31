import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { AllPhoneFormatsPipe } from '../../pipes/all-phone-formats-pipe';
import { TableColumn } from '../../models/data-table.interface';
import { FullNamePipe } from '../../pipes/full-name-pipe';
import { GenderFormatPipe } from '../../pipes/gender-format-pipe';
import { StatusLabelPipe } from '../../pipes/status-label-pipe';
import { TextHighlight } from '../../directives/text-highlight.directive';
import { StatusColorPipe } from '../../pipes/status-color-pipe';
import { DoctorTypeDirective } from '../../directives/doctor-type-directive';

@Component({
  selector: 'app-data-table',
  imports: [
    CommonModule,
    AllPhoneFormatsPipe,
    GenderFormatPipe,
    FullNamePipe,
    StatusLabelPipe,
    TextHighlight,
    StatusColorPipe,
    DoctorTypeDirective,
  ],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTable {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() mode: string = '';
  @Input() pageTitle: string = '';
  @Input() bodyColumns: string[] = [];

  edit = output<any>();
  delete = output<any>();
  selectedItem = output<any>();

  onEdit(item: any) {
    this.edit.emit(item);
  }

  onDelete(item: any) {
    this.delete.emit(item);
  }

  selectItem(item: any) {
    this.selectedItem.emit(item);
  }
}
