import { Directive, ElementRef, Host, HostBinding, HostListener, Input } from '@angular/core';

// directive with selector that targets elements with class 'form-control', 'label', or 'label' with the 'appTextHighlight' attribute
@Directive({
  selector: 'button, label[appTextHighlight]',
  standalone: true,
})
export class TextHighlight {
  @Input() appTextHighlight: string = 'gold';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.appTextHighlight;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
