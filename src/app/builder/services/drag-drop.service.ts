import { Injectable, ElementRef, ViewChild } from '@angular/core';
import { DragElement } from 'src/app/interfaces/DragElement.interface';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { elementStyleValueChange } from '../actions/element.actions';
import { BehaviorSubject, Subscription } from 'rxjs';
import { saveAs } from 'file-saver';
import { DropComponent } from '../dropSection/drop.component';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  @ViewChild(DropComponent, {static: true}) private formRef: ElementRef;
  formStyle: FormGroup = new FormGroup({
    title: new FormControl(''),
    fontSize: new FormControl(''),
    fontColor: new FormControl(''),
    width: new FormControl(''),
    height: new FormControl(''),
    align: new FormControl(''),
    background: new FormControl(''),
  });
  elementStyle: FormGroup = new FormGroup({
    placeholder: new FormControl(''),
    width: new FormControl(''),
    height: new FormControl(''),
    required: new FormControl(''),
    fontColor: new FormControl(''),
    fontSize: new FormControl(''),
    fontWeight: new FormControl(''),
    borderColor: new FormControl(''),
    borderRadius: new FormControl(''),
    background: new FormControl(''),
    align: new FormControl(''),
    containerWidth: new FormControl(''),
    value: new FormControl(''),
    paddingTop: new FormControl(''),
    paddingRight: new FormControl(''),
    paddingBottom: new FormControl(''),
    paddingLeft: new FormControl(''),
    marginTop: new FormControl(''),
    marginRight: new FormControl(''),
    marginBottom: new FormControl(''),
    marginLeft: new FormControl(''),
  });
  formControlVisibleChange: BehaviorSubject<any> = new BehaviorSubject<any>({
    placeholder: true,
    required: true,
    value: true,
    borderRadius: true,
    borderColor: true
  });
  elementDisablingChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  currentSelectedElementIndex: number | null;
  currentSelectedElement: HTMLInputElement | null;
  componentList: DragElement[] = [
    {
      title: 'Text',
      icon: `${environment.images}/pencil.svg`,
      tag: 'input',
      type: 'text',
      class: 'custom-text',
      value: 'Text'
    },
    {
      title: 'Text Input',
      icon: `${environment.images}/toy-alphabet-blocks.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'text',
    },
    {
      title: 'Textarea',
      icon: `${environment.images}/writing.svg`,
      tag: 'textarea',
      placeholder: 'Placeholer',
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
      placeholder: 'Placeholer',
      type: 'email',
    },
    {
      title: 'Password',
      icon: `${environment.images}/password.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'password',
    },
    {
      title: 'Number',
      icon: `${environment.images}/board-score.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'number',
    },
    {
      title: 'Link',
      icon: `${environment.images}/domain-name.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'url',
    },
    {
      title: 'Radio Button',
      icon: `${environment.images}/list-view.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'radio',
    },
    {
      title: 'Multi Select',
      icon: `${environment.images}/select-all.svg`,
      tag: 'select',
      placeholder: 'Placeholer',
      type: 'text',
    },
    {
      title: 'Select',
      icon: `${environment.images}/check-mark-box-line.svg`,
      tag: 'select',
      placeholder: 'Placeholer',
      type: 'text',
    },
    {
      title: 'File Uploader',
      icon: `${environment.images}/file-upload.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'file',
    },
    {
      title: 'Button',
      icon: `${environment.images}/submit-label.svg`,
      tag: 'button',
      placeholder: 'Placeholer',
      value: 'Submit',
      type: 'submit',
    },
  ];

  addedComponentList: DragElement[] = [];
  constructor(private store: Store<AppState>) { }

  addToForm(item: DragElement): void{
    this.addedComponentList.push(item)
  }
  clearForm(): void{
    this.addedComponentList = []
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
    if(this.currentSelectedElement?.isSameNode(element) || !element || !element.parentElement){
      this.currentSelectedElementIndex = null 
      this.currentSelectedElement = null
      this.elementDisablingChange.next(true);
      return
    }
    this.elementDisablingChange.next(false);
    this.currentSelectedElementIndex = index
    this.currentSelectedElement = element
    this.setCurrentStylesToElement(element)
    if(element.parentElement.className.includes('custom-text')){
      this.formControlVisibleChange.next({
        placeholder: false,
        required: false,
        value: true,
        borderRadius: false,
        borderColor: false
      })
    }
    else if( element.type == 'submit'){
      this.formControlVisibleChange.next({
        placeholder: false,
        required: false,
        value: true,
        borderRadius: true,
        borderColor: true
      })
    }else if(element.tagName == "SELECT" || element.type == 'radio' || element.type == 'checkbox'){
      this.formControlVisibleChange.next({
        placeholder: false,
        required: true,
        value: false,
        borderRadius: true,
        borderColor: true
      })
    }else{
      this.formControlVisibleChange.next({
        placeholder: true,
        required: true,
        value: false,
      })
    }
  }
  setCurrentStylesToElement(element: HTMLInputElement){
    const style = getComputedStyle(element)
    const parent = element.parentElement as HTMLElement   
    let elementStyle = {
      placeholder: element.placeholder,
      fontSize: +style.fontSize.replace(/[^0-9]/g,''),
      fontColor: this.rgb2hex(style.color),
      fontWeight: style.fontWeight,
      width: +element.style.width.replace(/[^0-9]/g,''),
      height: element.offsetHeight,
      required: element.required,
      align: parent.style.justifyContent,
      containerWidth: +parent.style.width.replace(/[^0-9]/g,''),
      value: element.innerText,
      background: this.rgb2hex(style.backgroundColor),
      borderRadius: style.borderRadius,
      borderColor: style.borderColor,
      paddingTop: style.paddingTop.replace(/[^0-9]/g,''),
      paddingRight: style.paddingRight.replace(/[^0-9]/g,''),
      paddingBottom: style.paddingBottom.replace(/[^0-9]/g,''),
      paddingLeft: style.paddingLeft.replace(/[^0-9]/g,''),
      marginTop: style.marginTop.replace(/[^0-9]/g,''),
      marginRight: style.marginRight.replace(/[^0-9]/g,''),
      marginBottom: style.marginBottom.replace(/[^0-9]/g,''),
      marginLeft: style.marginLeft.replace(/[^0-9]/g,''),
    }
    this.elementStyle.patchValue(elementStyle);
    this.store.dispatch(elementStyleValueChange(elementStyle))
  }
  setForm(form: ElementRef){
    this.formRef = form
  }
  download(filename:string) {
    const html = this.formRef.nativeElement
    let style = `<style>
    .drop__container{
      border-radius: 5px;
      padding: 13px;
    }
    .drop__container .drop__header{
        background: rgb(19, 192, 13);
        color: #fff;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .drop__container p{
      margin: 0;
    }
    .drop__container .drop__header h1{
        margin: 0;
        padding: 15px;
        font-size: 29px;
    }
    .drop__container .drop__wrapper{
        border: 2px solid rgb(163, 163, 163);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .drop__container .drop__body{
        min-height: 30px;
        background: #fff;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        padding: 15px;
    }
    .drop__container .drop__footer{
        background: rgb(202, 202, 202);
        min-height: 30px;
    }
    .custom-text input{ 
        background: transparent;
        border: none;
        outline: none;
    }
    .custom-text input:active{ 
        border-bottom: 2px solid lightslategray;
    }
    .dragElements__item {
        display: flex;
        padding: 10px;
        align-items: center;
    }
    .dragElements__item {
      width: 100%;
    }
                  </style>`
    saveAs('data:text/html;charset=utf-8, ' + encodeURIComponent(style + html.outerHTML), filename)
  }
}
