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

  public get value() {
    return this._value;
  }
  @Input()
  public set value(val) {
   this._value = val;
   this.onChange(this._value);
  }
  constructor() { }
  public ngOnInit(): void {
  }
  
  public writeValue(value: Alignment): void {
    this.value = value;
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void { }


}
