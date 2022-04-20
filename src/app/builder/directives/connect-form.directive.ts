import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Subscription, take, debounceTime } from 'rxjs';
import { Store } from '@ngrx/store';
import { formStyleValueChange } from '../actions/form.actions';
import { elementStyleValueChange } from '../actions/element.actions';

@Directive({
  selector: '[connectForm]'
})
export class ConnectFormDirective {
  @Input('connectForm') path : string;
  @Input() debounce : number = 300;
  formChange : Subscription;
  dispatches: any = {
    'element': elementStyleValueChange,
    'form': formStyleValueChange
  }
  constructor( private formGroupDirective : FormGroupDirective,
               private store : Store<any> ) {}
  ngOnInit() {
    this.store.select(state => state[this.path])
    .pipe(
      take(1)
    )
      .subscribe(val => {
         this.formGroupDirective.form.patchValue(val);
    });

    this.formChange = this.formGroupDirective.form.valueChanges
      .pipe(
        debounceTime(this.debounce)
      )
      .subscribe(value => {
        this.store.dispatch(this.dispatches[this.path](value))
      })
    }
}
