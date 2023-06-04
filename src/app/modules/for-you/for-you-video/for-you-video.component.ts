import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'cmp-for-you-video',
  templateUrl: './for-you-video.component.html',
  styleUrls: ['./for-you-video.component.css']
})
export class ForYouVideoComponent {

  // private element: HTMLElement;

  // constructor(elementRef: ElementRef) {
  //   this.element = elementRef.nativeElement;
  // }
  @HostListener('window:scroll')
  checkVisibility() {
    console.log("oi")
  }
}
