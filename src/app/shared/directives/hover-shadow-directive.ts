import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: 'app-card,[appHoverShadow]',
  standalone: true,
})
export class HoverShadowDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(this.element.nativeElement, 'box-shadow', '0 4px 20px rgba(0,0,0,0.2)');
    this.renderer.setStyle(this.element.nativeElement, 'background-color', 'gold');

    this.renderer.setStyle(this.element.nativeElement, 'transition', '0.3s');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.removeStyle(this.element.nativeElement, 'box-shadow');
    this.renderer.removeStyle(this.element.nativeElement, 'background-color');
  }
}
