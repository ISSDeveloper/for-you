import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForYouComponent } from './for-you.component';
import { ForYouVideoComponent } from './for-you-video/for-you-video.component';



@NgModule({
  exports: [
    ForYouComponent
  ],
  declarations: [
    ForYouComponent,
    ForYouVideoComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class ForYouModule { }
