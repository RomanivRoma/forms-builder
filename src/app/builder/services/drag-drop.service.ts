import { Injectable, ElementRef, ViewChild } from '@angular/core';
import { DragElement } from 'src/app/interfaces/DragElement.interface';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { elementStyleValueChange } from '../actions/element.actions';
import { BehaviorSubject, Subject, Subscriber } from 'rxjs';
import { saveAs } from 'file-saver';
import { DropComponent } from '../dropSection/drop.component';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  @ViewChild(DropComponent, {static: true}) private formRef: ElementRef;
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
    justifyContent: new FormControl(''),
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
    label: new FormControl(''),
  });
  id: number = 1;
  elementDisablingChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  selectedElementId: number | null;
  selectedElementObject: DragElement | null;

  formControlVisibleChange: BehaviorSubject<any> = new BehaviorSubject<any>({
    placeholder: true,
    required: true,
    value: true,
    borderRadius: true,
    borderColor: true,
    label: true
  });
  addedComponentList: DragElement[] = [];
  constructor(private store: Store<AppState>) { }


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
        borderColor: false,
        label: false
      })
    }
    else if(component.type == 'submit'){
      this.formControlVisibleChange.next({
        placeholder: false,
        required: false,
        value: true,
        borderRadius: true,
        borderColor: true,
        label: false
      })
    }else if(component.tag == "select" || component.type == 'radio' || component.type == 'checkbox'){
      this.formControlVisibleChange.next({
        placeholder: false,
        required: true,
        value: false,
        borderRadius: true,
        borderColor: true,
        label: component.tag == "select" ? false :  true
      })
    }else{
      this.formControlVisibleChange.next({
        placeholder: true,
        required: true,
        value: false,
        borderRadius: true,
        borderColor: true,
        label: false
      })
    }
  }
  setCurrentStylesToElement(component: DragElement){
    let elementStyle:any = {}
    Object.keys(component?.style || []).forEach(el =>{
      elementStyle[el] = component.style[el]
      if(elementStyle[el].includes('px') || elementStyle[el].includes('%'))
        elementStyle[el] = elementStyle[el].replace(/[^0-9]/g,'')
    })
    elementStyle = {
      ...elementStyle,
      label: component?.label || '',
      placeholder: component?.placeholder || '',
      value: component?.value || '',
      required: component?.required || false,
      containerWidth: component.parentStyle.width.replace(/[^0-9]/g,''),
    }
    this.elementStyle.patchValue(elementStyle);
    this.store.dispatch(elementStyleValueChange(elementStyle))
  }


  addToForm(item: DragElement): void{
    this.addedComponentList.push({...item, id: this.id++})
  }
  clearForm(): void{
    this.addedComponentList = []
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
        flex-direction: column;
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
