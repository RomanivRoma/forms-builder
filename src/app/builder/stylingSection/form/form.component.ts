import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DragDropService } from '../../services/drag-drop.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormComponent),
      multi: true
    }
  ]
})
export class FormComponent implements OnInit, ControlValueAccessor {
  innerWidth: number = window.innerWidth;
  innerHeight: number = window.innerHeight;
  formStyle: FormGroup = new FormGroup({
    title: new FormControl(''),
    fontSize: new FormControl(''),
    fontColor: new FormControl(''),
    width: new FormControl(''),
    height: new FormControl(''),
    align: new FormControl(''),
    background: new FormControl(''),
  });
  constructor(public dragDrop: DragDropService) { }

  writeValue(obj: any): void {
    console.log(obj);
    
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  ngOnInit(): void {
  }
  handleDownload(){
    this.dragDrop.download('form.html')
  }
  handleClear(){
    this.dragDrop.unselectElement()
    this.dragDrop.clearForm()
  }
}
