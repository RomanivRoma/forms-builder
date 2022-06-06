import { Directive, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { take, debounceTime, takeUntil, Subject, Observable } from 'rxjs';
import { Action, ActionCreator, Store } from '@ngrx/store';
import { formStyleValueChange } from '../actions/form.actions';
import { elementStyleValueChange } from '../actions/element.actions';
import { Element } from '../models/element.model';
import { Form } from '../models/form.model';
import { element } from 'protractor';
import { TypedAction } from '@ngrx/store/src/models';

// enum StylingComponents {
//   element,
//   form
// }
@Directive({
  selector: '[connectForm]',
})
export class ConnectFormDirective {
  private destroy$: Subject<boolean> = new Subject();
  @Input('connectForm') path: string;
  @Input() debounce: number = 300;

  constructor(
    private formGroupDirective: FormGroupDirective,
    private store: Store<any>
  ) {}

  public ngOnInit() {
    this.getComponent().subscribe((val: Form | Element) => {
      this.formGroupDirective.form.patchValue(val);
    });

    this.getChanges().subscribe((value: Form | Element) => {
      let actionCreator: Action;
      switch (this.path) {
        case 'form':
          actionCreator = formStyleValueChange(value as Form);
          break;
        case 'element':
          actionCreator = elementStyleValueChange(value as Element);
          break;
        default:
          actionCreator = formStyleValueChange(value as Form);
          break;
      }
      this.store.dispatch(actionCreator);
    });
  }

  public getComponent(): Observable<Form | Element> {
    return this.store
      .select((state) => state[this.path])
      .pipe(takeUntil(this.destroy$), take(1));
  }
  public getChanges(): Observable<Form | Element> {
    return this.formGroupDirective.form.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(this.debounce)
    );
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
