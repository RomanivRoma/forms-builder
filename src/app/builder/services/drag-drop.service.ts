import { Injectable } from '@angular/core';
import { DragElement } from 'src/app/interfaces/DragElement.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  formTitle: string;
  currentSelectedElementIndex: number | null;
  currentSelectedElement: HTMLElement | null;
  componentList: DragElement[] = [
    {
      title: 'Text',
      icon: `${environment.images}/pencil.svg`,
      tag: 'input',
      type: 'text',
      class: 'custom-text'
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
      type: 'number',
    },
    {
      title: 'Link',
      icon: `${environment.images}/domain-name.svg`,
      tag: 'input',
      type: 'url',
    },
    {
      title: 'Radio Button',
      icon: `${environment.images}/list-view.svg`,
      tag: 'input',
      type: 'radio',
    },
    {
      title: 'Multi Select',
      icon: `${environment.images}/select-all.svg`,
      tag: 'select',
      type: 'text',
    },
    {
      title: 'Select',
      icon: `${environment.images}/check-mark-box-line.svg`,
      tag: 'select',
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
      type: 'submit',
    },
  ];
  addedComponentList: DragElement[] = [];
  constructor() { }
  
  addToForm(item: DragElement): void{
    this.addedComponentList.push(item)
  }
  setSelectedElement(index: number | null, element: HTMLElement | null): void{
    this.currentSelectedElementIndex = index
    this.currentSelectedElement = element
  }
  getSelectedElement(): HTMLElement | null{
    return this.currentSelectedElement
  }
  getComponents(): DragElement[]{
    return this.componentList
  }
  getAddedComponents(): DragElement[]{
    return this.addedComponentList
  }
}
