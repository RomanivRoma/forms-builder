import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Indent } from 'src/app/interfaces/indent.interface';

@Component({
  selector: 'app-indent-input',
  templateUrl: './indent-input.component.html',
  styleUrls: ['./indent-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IndentInputComponent),
      multi: true,
    },
  ],
})
export class IndentInputComponent implements OnInit, ControlValueAccessor {
  public indent: FormGroup;
  @Input() title: string;

  constructor(fb: FormBuilder) {
    this.indent = fb.group({
      top: [0],
      right: [0],
      bottom: [0],
      left: [0],
    });
  }
  public onChange: (value: number) => void;

  public writeValue(value: Indent): void {
    if (value) {
      this.indent.setValue(value);
    }
  }
  public registerOnChange(fn: any): void {
    this.indent.valueChanges.subscribe(fn);
  }
  public registerOnTouched(fn: any): void {}

  public ngOnInit(): void {}
}
