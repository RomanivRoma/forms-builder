import { Injectable, ElementRef, ViewChild } from '@angular/core';
import { DragElement } from 'src/app/interfaces/DragElement.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Observer, shareReplay, Subject, Subscriber } from 'rxjs';
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
  private selectedElementId: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  private formControlVisibleChange: BehaviorSubject<any> = new BehaviorSubject<any>({
    placeholder: true,
    required: true,
    value: true,
    borderRadius: true,
    borderColor: true,
    label: true
  });
  private addedComponentList: BehaviorSubject<DragElement[]> = new BehaviorSubject<DragElement[]>([]);

  constructor() { }

  selectElement(component: DragElement): DragElement{
    this.selectedElementId.next(component.id || null)
    this.elementDisablingChange.next(false)
    return component
  }
  unselectElement(): void{
    this.selectedElementId.next(null)
    this.elementDisablingChange.next(true)
  }
  setSelectedElement(element: any) {
    const componentList: DragElement[] = this.addedComponentList.getValue()
    let selectedElement: any = componentList.find(el => el.id == this.selectedElementId.getValue())
    selectedElement = {...selectedElement, ...element}
    const newComponentList: DragElement[] = componentList.map(component => component.id == selectedElement?.id ? selectedElement : component);
    this.addedComponentList.next(newComponentList)
  }
  setFormControlVisibleChange(component: DragElement) {
    let visibleInputs = {}
    if(component.class == 'custom-text'){
      visibleInputs = {
        placeholder: false,
        required: false,
        value: true,
        borderRadius: false,
        borderColor: false,
        label: false
      }
    }
    else if(component.tag == 'button'){
      visibleInputs = {
        placeholder: false,
        required: false,
        value: true,
        borderRadius: true,
        borderColor: true,
        label: false
      }
    }
    else if(component.tag == "select"){
      visibleInputs = {
        placeholder: false,
        required: true,
        value: false,
        borderRadius: true,
        borderColor: true,
        label: false
      }
    }
    else if(component.type == 'radio' || component.type == 'checkbox'){
      visibleInputs = {
        placeholder: false,
        required: true,
        value: false,
        borderRadius: true,
        borderColor: true,
        label: true
      }
    }
    else{
      visibleInputs = {
        placeholder: true,
        required: true,
        value: false,
        borderRadius: true,
        borderColor: true,
        label: false
      }
    }
    this.formControlVisibleChange.next({...visibleInputs})
    return visibleInputs
  }
  getSelectedElementId(){
    return this.selectedElementId.pipe(shareReplay())
  }
  getFormControlVisibleChange(){
    return this.formControlVisibleChange.pipe(shareReplay())
  }
  addElement(item: DragElement): DragElement{
    const addedElement = {id: this.id++, ...item}
    const componentList = this.addedComponentList.getValue()
    this.addedComponentList.next([...componentList, addedElement])
    return addedElement
  }
  removeElement(id: number){
    const componentList = this.addedComponentList.getValue()
    this.addedComponentList.next(componentList.filter(el => el.id != id))
  }
  clearForm(): void{
    this.addedComponentList.next([])
  }
  setForm(form: ElementRef){
    this.formRef = form
  }
  getAddedComponents(): Observable<DragElement[]>{
    return this.addedComponentList.pipe(shareReplay())
  }
  download(filename:string) {
    const html = this.formRef.nativeElement
    const style = `<style>
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
