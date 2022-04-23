import { Injectable, ElementRef, ViewChild } from '@angular/core';
import { DragElement } from 'src/app/interfaces/DragElement.interface';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { elementStyleValueChange } from '../actions/element.actions';
import { BehaviorSubject } from 'rxjs';
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
  id: number = 1;
  elementDisablingChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  selectedElementId: number | null;
  selectedElementObject: DragElement | null;
  defaultStyle: any = {
    "fontSize": '14',
    "fontColor": "#212529",
    "fontWeight": "400",
    "width": '100',
    "height": '22',
    "align": "left",
    "containerWidth": '100',
    "background": "#ffffff",
    "borderRadius": '0',
    "borderColor": '0',
    "paddingTop": '0',
    "paddingRight": '0',
    "paddingBottom": '0',
    "paddingLeft": '0',
    "marginTop": '5',
    "marginRight": '5',
    "marginBottom": '5',
    "marginLeft": '5'
  }
  defaultParentStyle: any = {
    'width': '100'
  }
  componentList: DragElement[] = [
    {
      title: 'Text',
      icon: `${environment.images}/pencil.svg`,
      tag: 'p',
      type: 'text',
      class: 'custom-text',
      value: 'Text',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Text Input',
      icon: `${environment.images}/toy-alphabet-blocks.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'text',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Textarea',
      icon: `${environment.images}/writing.svg`,
      tag: 'textarea',
      placeholder: 'Placeholer',
      type: 'text',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Checkbox',
      icon: `${environment.images}/checkbox.svg`,
      tag: 'input',
      type: 'checkbox',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Date',
      icon: `${environment.images}/date.svg`,
      tag: 'input',
      type: 'date',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Email',
      icon: `${environment.images}/email-round-solid.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'email',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Password',
      icon: `${environment.images}/password.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'password',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Number',
      icon: `${environment.images}/board-score.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'number',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Link',
      icon: `${environment.images}/domain-name.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'url',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Radio Button',
      icon: `${environment.images}/list-view.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'radio',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Multi Select',
      icon: `${environment.images}/select-all.svg`,
      tag: 'select',
      placeholder: 'Placeholer',
      type: 'text',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Select',
      icon: `${environment.images}/check-mark-box-line.svg`,
      tag: 'select',
      placeholder: 'Placeholer',
      type: 'text',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'File Uploader',
      icon: `${environment.images}/file-upload.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'file',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Button',
      icon: `${environment.images}/submit-label.svg`,
      tag: 'button',
      placeholder: 'Placeholer',
      value: 'Submit',
      type: 'submit',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
  ];

  addedComponentList: DragElement[] = [];
  constructor(private store: Store<AppState>) { }

  addToForm(item: DragElement): void{
    this.addedComponentList.push({...item, id: this.id++})
  }
  clearForm(): void{
    this.addedComponentList = []
  }
  setSelectedElement(component: DragElement| null): void{
    if(!component || component.id == this.selectedElementId){
      this.selectedElementId = null 
      this.selectedElementObject = null
      this.elementDisablingChange.next(true); 
      return
    }
    this.elementDisablingChange.next(false);
    this.selectedElementObject = component
    this.selectedElementId = component.id || null
    this.setCurrentStylesToElement(component)
    if(component.class == 'custom-text'){
      this.formControlVisibleChange.next({
        placeholder: false,
        required: false,
        value: true,
        borderRadius: false,
        borderColor: false
      })
    }
    else if(component.type == 'submit'){
      this.formControlVisibleChange.next({
        placeholder: false,
        required: false,
        value: true,
        borderRadius: true,
        borderColor: true
      })
    }else if(component.tag == "select" || component.type == 'radio' || component.type == 'checkbox'){
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
        borderRadius: true,
        borderColor: true
      })
    }
  }
  setCurrentStylesToElement(component: DragElement){
    const elementStyle = {
      placeholder: component.placeholder || '',
      value: component.value || '',
      required: component.required || false,
      fontColor: component.style.fontColor,
      fontSize: component.style.fontSize.replace(/[^0-9]/g,''),
      width: component.style.width.replace(/[^0-9]/g,''),
      height: component.style.height.replace(/[^0-9]/g,''),
      fontWeight: component.style.fontWeight,
      background: component.style.background,
      borderRadius: component.style.borderRadius.replace(/[^0-9]/g,''),
      borderColor: component.style.borderColor,
      paddingLeft: component.style.paddingLeft.replace(/[^0-9]/g,''),
      paddingTop: component.style.paddingTop.replace(/[^0-9]/g,''),
      paddingRight: component.style.paddingRight.replace(/[^0-9]/g,''),
      paddingBottom: component.style.paddingBottom.replace(/[^0-9]/g,''),
      marginLeft: component.style.marginLeft.replace(/[^0-9]/g,''),
      marginTop: component.style.marginTop.replace(/[^0-9]/g,''),
      marginRight: component.style.marginRight.replace(/[^0-9]/g,''),
      marginBottom: component.style.marginBottom.replace(/[^0-9]/g,''),
      align: component.style.align,
      containerWidth: component.parentStyle.width.replace(/[^0-9]/g,''),
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
    .dragElements__item input,
    .dragElements__item textarea,
    .dragElements__item p,
    .dragElements__item select{
        margin: 5px;
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
        height: 100%;
    }
    .drop__container .drop__footer{
        background: rgb(202, 202, 202);
        min-height: 30px;
    }
    .dragElements__item {
        display: flex;
        align-items: center;
    }
    .dragElements__item {
      width: 100%;
    }
    ::-webkit-scrollbar-track{
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 10px;
      background-color: #F5F5F5;
    }
    
    ::-webkit-scrollbar{
      width: 8px;
      height: 8px;
      background-color: #F5F5F5;
      border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb{
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #555;
    }
    
                  </style>`
    saveAs('data:text/html;charset=utf-8, ' + encodeURIComponent(style + html.outerHTML), filename)
  }
}
