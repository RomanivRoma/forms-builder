import { Directive, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { take, debounceTime, takeUntil, Subject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { formStyleValueChange } from '../actions/form.actions';
import { elementStyleValueChange } from '../actions/element.actions';
import { Element } from '../models/element.model';
import { Form } from '../models/form.model';

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
    .subscribe((val: Form | Element)  => {
        this.formGroupDirective.form.patchValue(val);
    });

    this.getChanges()
    .subscribe((value: Form | Element) => {
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
