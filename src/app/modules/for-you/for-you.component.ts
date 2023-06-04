import { AfterViewInit, ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { DynamicRef } from 'src/app/core/services/dynamic-renderer.service';

@Component({
  selector: 'cmp-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.css']
})
export class ForYouComponent implements AfterViewInit {

  height: number = 0;

  constructor(private dynamicRef: DynamicRef<ForYouComponent>, private changeDetectorRef: ChangeDetectorRef) {
  }
  ngAfterViewInit(): void {
    this.height = window.innerHeight;
    this.changeDetectorRef.detectChanges();
  }

  @HostListener("window:resize")
  onResize() {
    this.height = window.innerHeight;
    this.changeDetectorRef.detectChanges();
  }

  voltar() {
    this.dynamicRef.destroy();
  }

}
