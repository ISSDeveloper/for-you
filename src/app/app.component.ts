import { Component } from '@angular/core';
import { DynamicRenderer } from './core/services/dynamic-renderer.service';
import { ForYouComponent } from './modules/for-you/for-you.component';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent {
  title = 'for-you';

  constructor(private dynamicRenderer: DynamicRenderer) {
  }

  show() {
    this.dynamicRenderer.appendChildInOverlay(ForYouComponent);
  }
}
