import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { AllPhoneFormatsPipe } from '../../pipes/all-phone-formats-pipe';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule, AllPhoneFormatsPipe],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTable {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() mode = '';
  @Input() pageTitle = '';
  @Input() bodyColumns: string[] = [];

  edit = output<any>();
  delete = output<any>();

  onEdit(item: any) {
    this.edit.emit(item);
  }

  onDelete(item: any) {
    this.delete.emit(item);
  }
}
