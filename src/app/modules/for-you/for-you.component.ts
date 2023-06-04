import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ForYouVideoComponent } from './for-you-video/for-you-video.component';
import { DynamicRenderer } from 'src/app/core/services/dynamic-renderer.service';

@Component({
  selector: 'cmp-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.css']
})
export class ForYouComponent {

  constructor(private dynamicRenderer: DynamicRenderer) {

  }

  onScroll() {
  }

}
