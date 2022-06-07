import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ComponentStyle } from 'src/app/enums/style-enum.model';
import { DragDropService } from '../../services/drag-drop.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  public innerWidth: number = window.innerWidth;
  public innerHeight: number = window.innerHeight;
  public componentStyleForm: ComponentStyle = ComponentStyle.form;
  public formStyle: FormGroup = new FormGroup({
    title: new FormControl(''),
    fontSize: new FormControl(''),
    fontColor: new FormControl(''),
    width: new FormControl(''),
    height: new FormControl(''),
    align: new FormControl(''),
    background: new FormControl(''),
  });
  constructor(public dragDrop: DragDropService) { }

  public ngOnInit(): void {
  }
  public handleDownload(){
    this.dragDrop.download('form.html')
  }
  public handleClear(){
    this.dragDrop.unselectElement()
    this.dragDrop.clearForm()
  }
}
