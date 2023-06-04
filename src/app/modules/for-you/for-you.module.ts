import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForYouComponent } from './for-you.component';



@NgModule({
  exports: [
    ForYouComponent
  ],
  declarations: [
    ForYouComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ForYouModule { }
