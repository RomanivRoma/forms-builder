import { Directive, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Subscription, take, debounceTime, takeUntil, Subject, Observer, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { formStyleValueChange } from '../actions/form.actions';
import { elementStyleValueChange } from '../actions/element.actions';

@Directive({
  selector: '[connectForm]'
})
export class ConnectFormDirective {

  destroy$: Subject<boolean> = new Subject();
  @Input('connectForm') path : string;
  @Input() debounce : number = 300;
  dispatches: any = {
    'element': elementStyleValueChange,
    'form': formStyleValueChange
  }
  
  constructor( private formGroupDirective : FormGroupDirective,
               private store : Store<any> ) {}
  ngOnInit() {
    this.getComponent()
    .subscribe(val => {
        this.formGroupDirective.form.patchValue(val);
    });

    this.getChanges()
    .subscribe(value => {
      this.store.dispatch(this.dispatches[this.path](value))
    })
  }

  getComponent(): Observable<any>{
    return this.store.select(state => state[this.path])
    .pipe(
      takeUntil(this.destroy$),
      take(1)
    )
  }
  getChanges(): Observable<any> {
    return this.formGroupDirective.form.valueChanges
    .pipe(
      takeUntil(this.destroy$), 
      debounceTime(this.debounce)
    )
  }

  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
