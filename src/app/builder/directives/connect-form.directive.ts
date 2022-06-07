import { Directive, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { take, debounceTime, takeUntil, Subject, Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { formStyleValueChange } from '../actions/form.actions';
import { elementStyleValueChange } from '../actions/element.actions';
import { Element } from '../models/element.model';
import { Form } from '../models/form.model';
import { ComponentStyle } from 'src/app/enums/style-enum.model';
import { AppState } from 'src/app/app.state';

@Directive({
  selector: '[connectForm]',
})
export class ConnectFormDirective {
  private destroy$: Subject<boolean> = new Subject();
  @Input('connectForm') public path: ComponentStyle;
  @Input() public debounce: number = 300;

  constructor(
    private formGroupDirective: FormGroupDirective,
    private store: Store<AppState>
  ) {}

  public ngOnInit() {
    console.log(this.path);
    this.getComponent().subscribe((val: Form | Element) => {
      this.formGroupDirective.form.patchValue(val);
    });

    this.getChanges().subscribe((value: Form | Element) => {
      let actionCreator: Action;
      switch (this.path) {
        case ComponentStyle.form:
          actionCreator = formStyleValueChange(value as Form);
          break;
        case ComponentStyle.element:
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
