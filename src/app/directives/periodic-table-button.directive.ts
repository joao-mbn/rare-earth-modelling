import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPeriodicTableButton]'
})
export class PeriodicTableButtonDirective {

  lightGreen = 'rgb(135, 214, 135)';
  native: HTMLButtonElement;
  constructor(el: ElementRef<HTMLButtonElement>) {

    this.native = el.nativeElement;
    this.native.className = 'uk-button uk-button-default';
    this.native.style.background = `${this.lightGreen}`;
    this.native.style.padding = '1px 12px';
    this.native.style.minWidth = '43px';
    this.native.onclick = (e: MouseEvent) => {

    };
  }

}
