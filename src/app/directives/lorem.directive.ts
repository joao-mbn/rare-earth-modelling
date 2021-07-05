import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appLorem]',
})
export class LoremDirective {

  native: HTMLParagraphElement;

  constructor(el: ElementRef<HTMLParagraphElement>) {

    this.native = el.nativeElement;
    this.native.innerHTML = `
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dolorum, voluptates corrupti perspiciatis reprehenderit
      ipsam eaque esse maxime doloribus labore facilis animi, tempora soluta enim nostrum. Ducimus dolorum alias nesciunt!
    `;

    this.native.style.margin = '10px 50px';
    this.native.style.padding = '2px 20px';
    this.native.className = 'uk-text-italic';
    this.native.onmouseover = () => {
      this.native.style.boxShadow = '3px 2px 10px rgba(0, 0, 0, 0.8)';
      this.native.style.transition = 'box-shadow 0.3s';
    };
    this.native.onmouseout = () => {
      this.native.style.boxShadow = 'none';
      this.native.style.transition = 'box-shadow 0.3s';
    };

  }

}
