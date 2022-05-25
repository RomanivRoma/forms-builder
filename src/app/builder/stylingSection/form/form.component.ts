import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DragDropService } from '../../services/drag-drop.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
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
