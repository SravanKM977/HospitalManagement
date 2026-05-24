import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'input, .form-control, textarea, select',
  standalone: true,
})
export class FormInputFontDirective {
  constructor() {}

  @HostBinding('style.fontFamily') fontFamily: string = 'Arial, sans-serif';
  @HostBinding('style.fontSize') fontSize: string = '14px';
  @HostBinding('style.color') color: string = 'black';
}
