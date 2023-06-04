import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Renderer2, RendererFactory2, Type } from '@angular/core';

export class DynamicRef<T> {

  protected componentRef: ComponentRef<T>;

  constructor(private appRef: ApplicationRef) {
  }

  public destroy(): void {
    this.componentRef.destroy();
    this.appRef.detachView(this.componentRef.hostView);
  }
}

class DynamicRefController<T> extends DynamicRef<T> {

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
  public appendChild<T>(parent: HTMLElement, component: Type<T>): DynamicRef<T> {

    const dynamicRef = new DynamicRefController<T>(this.appRef);

    const componentRef = this.createComponent(component, dynamicRef);
    const componetTemplateRef = this.getTemplateComponent(componentRef);

    this.renderer.appendChild(parent, componetTemplateRef);

    dynamicRef.setComponentRef(componentRef);
    return dynamicRef;
  }

  private createComponent<T>(type: Type<T>, dynamicRef: DynamicRef<T>): ComponentRef<T> {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(type);
    const componentRef = componentFactory.create(this.createInjector(dynamicRef));
    this.appRef.attachView(componentRef.hostView);

    return componentRef;
  }

  private createInjector(useValue: any): Injector {
    return Injector.create({
      providers: [
        { provide: DynamicRef, useValue: useValue }
      ],
      parent: this.injector
    });
  }

  private getTemplateComponent(ComponentRef: ComponentRef<any>) {
    return (ComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }
}


