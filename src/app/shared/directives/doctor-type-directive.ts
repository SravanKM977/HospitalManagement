import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDoctorType]',
})
export class DoctorTypeDirective {
  @Input() appDoctorType = '';

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    switch (this.appDoctorType.toLowerCase()) {
      case 'cardiologist':
        this.renderer.setStyle(this.element.nativeElement, 'color', 'blue');
        break;

      case 'neurologist':
        this.renderer.setStyle(this.element.nativeElement, 'color', 'green');
        this.renderer.setStyle(this.element.nativeElement, 'font-size', '20px');
        break;

      case 'orthopedic':
        this.renderer.setStyle(this.element.nativeElement, 'color', 'orange');
        break;
    }
  }
}
