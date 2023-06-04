import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay.component';
import { ForYouModule } from 'src/app/modules/for-you/for-you.module';



@NgModule({
  exports: [
    OverlayComponent
  ],
  declarations: [
    OverlayComponent
  ],
  imports: [
    CommonModule,
    ForYouModule
  ]
})
export class OverlayModule { }
