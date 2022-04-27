import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DragDropService } from '../../services/drag-drop.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
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
    this.dragDrop.clearForm()
  }
}
