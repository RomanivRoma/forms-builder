import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { IDragComponent } from '../../../interfaces/dragComponent.interface';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.css']
})
export class DragComponent implements OnInit {

  componentList: Array<IDragComponent> = [
    {
      title: 'Text',
      icon: `${environment.images}/pencil.svg`,
      tag: 'input',
      type: 'text',
    },
    {
      title: 'Text Input',
      icon: `${environment.images}/toy-alphabet-blocks.svg`,
      tag: 'input',
      type: 'text',
    },
    {
      title: 'Textarea',
      icon: `${environment.images}/writing.svg`,
      tag: 'textarea',
      type: 'text',
    },
    {
      title: 'Checkbox',
      icon: `${environment.images}/checkbox.svg`,
      tag: 'input',
      type: 'checkbox',
    },
    {
      title: 'Date',
      icon: `${environment.images}/date.svg`,
      tag: 'input',
      type: 'date',
    },
    {
      title: 'Email',
      icon: `${environment.images}/email-round-solid.svg`,
      tag: 'input',
      type: 'email',
    },
    {
      title: 'Password',
      icon: `${environment.images}/password.svg`,
      tag: 'input',
      type: 'password',
    },
    {
      title: 'Number',
      icon: `${environment.images}/board-score.svg`,
      tag: 'input',
      type: 'text',
    },
    {
      title: 'Link',
      icon: `${environment.images}/domain-name.svg`,
      tag: 'input',
      type: 'text',
    },
    {
      title: 'Radio Button',
      icon: `${environment.images}/list-view.svg`,
      tag: 'input',
      type: 'text',
    },
    {
      title: 'Multi Select',
      icon: `${environment.images}/select-all.svg`,
      tag: 'input',
      type: 'text',
    },
    {
      title: 'Select',
      icon: `${environment.images}/check-mark-box-line.svg`,
      tag: 'input',
      type: 'text',
    },
    {
      title: 'File Uploader',
      icon: `${environment.images}/file-upload.svg`,
      tag: 'input',
      type: 'file',
    },
    {
      title: 'Button',
      icon: `${environment.images}/submit-label.svg`,
      tag: 'input',
      type: 'text',
    },
  ]

  constructor() { }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.componentList, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {
  }

}
