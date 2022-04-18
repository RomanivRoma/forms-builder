import { Injectable } from '@angular/core';
import { DragElement } from 'src/app/interfaces/DragElement.interface';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { elementStyleValueChange } from '../actions/element.actions';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  formStyle: FormGroup = new FormGroup({
    title: new FormControl(''),
    fontSize: new FormControl(''),
    fontColor: new FormControl(''),
    width: new FormControl(''),
    height: new FormControl(''),
  });
  elementStyle: FormGroup = new FormGroup({
    placeholder: new FormControl(''),
    width: new FormControl(''),
    height: new FormControl(''),
    required: new FormControl(''),
    fontColor: new FormControl(''),
    fontSize: new FormControl(''),
    fontWeight: new FormControl(''),
    border: new FormControl(''),
  });
  elementDisablingChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  formTitle: string;
  currentSelectedElementIndex: number | null;
  currentSelectedElement: HTMLInputElement | null;
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
  constructor(private store: Store<AppState>) { }

  addToForm(item: DragElement): void{
    this.addedComponentList.push(item)
  }
  rgb2hex(rgb:any) {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);
    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
    return "#" + r + g + b;
  }
  
  setSelectedElement(index: number | null, element: HTMLInputElement | null): void{
    if (!element) {
      return
    }
    if(this.currentSelectedElement?.isSameNode(element)){
      this.currentSelectedElementIndex = null 
      this.currentSelectedElement = null
      this.elementDisablingChange.next(true);
      return
    }
    this.elementDisablingChange.next(false);
    this.currentSelectedElementIndex = index
    this.currentSelectedElement = element
        
    // const initialState: Element = {
    //     placeholder: 'Placeholder',
    //     fontSize: 25,
    //     fontColor: '#000',
    //     width: 300,
    //     height: 300,
    //     required: false
    // }
    let style = getComputedStyle(element)
    let elementStyle = {
      placeholder: element.placeholder,
      fontSize: +style.fontSize.replace(/[^0-9]/g,''),
      fontColor: this.rgb2hex(style.color),
      fontWeight: style.fontWeight,
      width: element.offsetWidth,
      height: element.offsetHeight,
      required: element.required
    }
    this.elementStyle.patchValue(elementStyle);
    this.store.dispatch(elementStyleValueChange(elementStyle))
  }

}
