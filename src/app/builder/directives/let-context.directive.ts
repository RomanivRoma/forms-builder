import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface LetContext<T> {
  ngLet: T;
}

@Directive({
  selector: '[ngLet]',
})
export class LetContextDirective<T> {
  private _context: LetContext<T | null> = { ngLet: null };

  constructor(
    private _viewContainer: ViewContainerRef,
    private _templateRef: TemplateRef<LetContext<T>>
  ) {
    _viewContainer.createEmbeddedView(_templateRef, this._context);
  }

  @Input()
  public set ngLet(value: T) {
    this._context.ngLet = value;
  }
}
