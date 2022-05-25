import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Alignment } from 'src/app/enums/alignment.model';

@Component({
  selector: 'app-align-input',
  templateUrl: './align-input.component.html',
  styleUrls: ['./align-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AlignInputComponent),
      multi: true,
    },
  ],
})
export class AlignInputComponent implements OnInit, ControlValueAccessor {
  public eAlignment = Alignment;
  private onChange(_: Alignment) {}
  private _value: Alignment;

  get value() {
    return this._value;
  }
  @Input()
  set value(val) {
   this._value = val;
   this.onChange(this._value);
  }
  constructor() { }
  writeValue(value: Alignment): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void { }

  ngOnInit(): void {
  }

}
