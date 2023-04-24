import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @HostBinding('class.tile--clicked') clickedClass: boolean = false;

  @HostListener('click') onMouseClick() {
    this.clickedClass = true;
  }
}
