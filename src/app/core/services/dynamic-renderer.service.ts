import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Renderer2, RendererFactory2, Type } from '@angular/core';
import { OverlayComponent } from 'src/app/shared/layout/overlay/overlay.component';

export class DynamicRef<T> {

  protected componentRef: ComponentRef<T>;
  protected parentRef: DynamicRef<T>;

  constructor(private appRef: ApplicationRef) {
  }

  public destroy(): void {
    this.componentRef.destroy();
    this.appRef.detachView(this.componentRef.hostView);

    if (this.parentRef) {
      this.parentRef.destroy();
    }
  }
}

class DynamicRefController<T> extends DynamicRef<T> {

  setParentRef(parentRef: DynamicRef<any>): void {
    super.parentRef = parentRef;
  }

  public setComponentRef(componentRef: ComponentRef<T>): void {
    super.componentRef = componentRef
  }
}

@Injectable({
  providedIn: 'root'
})
export class DynamicRenderer {

  private renderer: Renderer2;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    rendererFactory: RendererFactory2,
  ) {
    this.renderer = rendererFactory.createRenderer(document.body, null);
  }

  /**
   * Appends a dynamic component to the specified parent element.
   * @param parent The parent element where the component will be appended.
   * @param component The type of the component to be appended.
   * @returns The reference to the dynamic component.
   */
  public appendChild<T>(parent: HTMLElement, component: Type<T>, parentRef?: DynamicRef<any>): DynamicRef<T> {

    const dynamicRef = new DynamicRefController<T>(this.appRef);

    const componentRef = this.createComponent(component, dynamicRef, parentRef);
    const componentTemplateRef = this.getTemplateComponent(componentRef);

    this.renderer.appendChild(parent, componentTemplateRef);

    return dynamicRef;
  }

  public appendChildInOverlay<T>(component: Type<T>): DynamicRef<T> {

    const overlayDynamicRef = new DynamicRefController<T>(this.appRef);

    const overlayRef = this.createComponent(OverlayComponent, overlayDynamicRef);
    const overlayTemplateRef = this.getTemplateComponent(overlayRef);

    this.renderer.appendChild(document.body, overlayTemplateRef);

    const overlayConent = overlayTemplateRef.querySelector(".overlay-conent") as HTMLElement;

    return this.appendChild(overlayConent, component, overlayDynamicRef);
  }

  private createComponent<T>(type: Type<T>, dynamicRef?: DynamicRefController<T>, parentRef?: DynamicRef<any>): ComponentRef<T> {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(type);
    const componentRef = componentFactory.create(dynamicRef ? this.createInjector(dynamicRef) : this.injector);
    this.appRef.attachView(componentRef.hostView);

    dynamicRef.setComponentRef(componentRef);
    dynamicRef.setParentRef(parentRef);

    return componentRef;
  }

  private createInjector(dynamicRef: DynamicRef<any>): Injector {
    return Injector.create({
      providers: [
        { provide: DynamicRef, useValue: dynamicRef }
      ],
      parent: this.injector
    });
  }

  private getTemplateComponent(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }
}


