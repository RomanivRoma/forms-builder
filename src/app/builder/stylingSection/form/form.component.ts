import { Component, OnInit } from '@angular/core';
import { DragDropService } from '../../services/drag-drop.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  innerWidth: number = window.innerWidth;
  innerHeight: number = window.innerHeight;

  constructor(public dragDrop: DragDropService) { }

  ngOnInit(): void {
  }
  ngOnDestroy(){
  }
  handleDownload(){
    this.dragDrop.download('form.html')
  }
  handleClear(){
    this.dragDrop.clearForm()
  }
}
