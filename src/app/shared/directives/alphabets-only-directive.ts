import { Directive, Host, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphabetsOnlyDirective]',
  standalone: true,
})
export class AlphabetsOnlyDirective {
  private allowedKeys: string[] = [
    'Backspace',
    'Delete',
    'Tab',
    'ArrowLeft',
    'ArrowRight',
    'Home',
    'End',
    'Enter',
  ];

  constructor() {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey || event.metaKey) return;
    if (this.allowedKeys.includes(event.key)) return;

    if (!/^[a-zA-Z]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    const alphabetsOnly = pastedText.replace(/[^a-zA-Z]/g, '');
    document.execCommand('insertText', false, alphabetsOnly);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    const droppedText = event.dataTransfer?.getData('text') || '';
    const alphabetsOnly = droppedText.replace(/[^a-zA-Z]/g, '');
    document.execCommand('insertText', false, alphabetsOnly);
  }
}
