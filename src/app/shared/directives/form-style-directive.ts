import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'form, [appFormStyleDirective]',
  standalone: true,
})
export class FormStyleDirective {
  @Input() appFormStyleDirective: string = 'whitesmoke';

  constructor(private el: ElementRef) {}

  @HostBinding('style.display') display: string = 'flex';
  @HostBinding('style.flexDirection') flexDirection: string = 'column';
  @HostBinding('style.gap') gap: string = '20px';
  @HostBinding('style.maxWidth') maxWidth: string = 'auto';
  @HostBinding('style.margin') margin: string = '20px auto';
  @HostBinding('style.padding') padding: string = '20px';
  @HostBinding('style.backgroundColor') backgroundColor: string = 'powderblue';
  @HostBinding('style.borderRadius') borderRadius: string = '10px';
}
