import { Component } from '@angular/core';
import { DynamicRef } from 'src/app/core/services/dynamic-renderer.service';

@Component({
  selector: 'cmp-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.css']
})
export class ForYouComponent {


  constructor(private dynamicRef: DynamicRef<ForYouComponent>) {
  }

  voltar() {
    this.dynamicRef.destroy();
  }

}
