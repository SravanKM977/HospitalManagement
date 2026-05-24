import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoAlphabetsDirective]',
  standalone: true,
})
export class NoAlphabetsDirective {
  // keys that should always be allowed regardless
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
    // always allow control/meta combinations (Ctrl+C, Ctrl+V, Ctrl+A etc.)
    if (event.ctrlKey || event.metaKey) return;

    // always allow navigation and utility keys
    if (this.allowedKeys.includes(event.key)) return;

    // block if the key is an alphabet letter (a-z or A-Z)
    if (/^[a-zA-Z]$/.test(event.key)) {
      event.preventDefault(); // ← blocks the alphabet keystroke
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    const noAlphabets = pastedText.replace(/[a-zA-Z]/g, ''); // strip all alphabets
    document.execCommand('insertText', false, noAlphabets);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    const droppedText = event.dataTransfer?.getData('text') || '';
    const noAlphabets = droppedText.replace(/[a-zA-Z]/g, '');
    document.execCommand('insertText', false, noAlphabets);
  }
}
