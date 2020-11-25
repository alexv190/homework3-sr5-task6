import {
  ElementRef,
  Injectable,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DomService {
  constructor(private renderer: Renderer2) {}

  generateLog(value: string, elementRef: ElementRef) {
    const logElem = this.renderer.createElement('p');
    this.renderer.appendChild(elementRef.nativeElement, logElem);
    logElem.innerText = value;
  }

  clearLog(elementRef: ElementRef) {
    const childElements = elementRef.nativeElement.children;
    for (let child of childElements) {
      this.renderer.removeChild(elementRef.nativeElement, child);
    }
  }
}
