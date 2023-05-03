import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective {
  @Input() appHover?: string;

  @HostBinding('style.transform') transform?: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.transform = this.appHover;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.transform = '';
  }
}
