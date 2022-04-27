import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DragElement } from '../../interfaces/DragElement.interface';
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { takeUntil, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { DragDropService } from '../services/drag-drop.service';
import { elementStyleValueChange } from '../actions/element.actions';
@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.css'],
})
export class DropComponent implements OnInit, AfterViewInit {
  @ViewChild('dropListContainer') dropListContainer?: ElementRef;
  @ViewChild('mainForm', {static: true}) formRef: ElementRef;
  destroy$: Subject<boolean> = new Subject();
  form: any;
  element: any
  titleStyle: any;
  formStyle: any;
  headerStyle: any;
  addedComponentList: DragElement[];


  constructor(public dragDrop: DragDropService,
              private store: Store<AppState>) { }
              

  ngOnInit(): void {
    this.store.select('form')
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(val => {
      this.form = val
      this.titleStyle = {
        'fontSize.px': this.form.fontSize,
        'color': this.form.fontColor,
        'textAlign': this.form.align   
      }
      this.formStyle = {
        'width.px': this.form.width,
        'height.px': this.form.height
      }
      this.headerStyle = {
        'backgroundColor': this.form.background
      }
    });
    this.store.select('element')
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(val => {
      this.element = val
      const style = {
        'color': this.element.fontColor,
        'fontSize': this.element.fontSize + 'px',
        'width': this.element.width + '%',
        'height': this.element.height + 'px',
        'fontWeight': this.element.fontWeight,
        'background': this.element.background,
        'borderRadius': this.element.borderRadius + 'px',
        'borderColor': this.element.borderColor,
        'paddingLeft': this.element.paddingLeft + 'px',
        'paddingTop': this.element.paddingTop + 'px',
        'paddingRight': this.element.paddingRight + 'px',
        'paddingBottom': this.element.paddingBottom + 'px',
        'marginLeft': this.element.marginLeft + 'px',
        'marginTop': this.element.marginTop + 'px',
        'marginRight': this.element.marginRight + 'px',
        'marginBottom': this.element.marginBottom + 'px',
      }
      const parentStyle = {
        'width': this.element.containerWidth + '%',
        'justifyContent': this.element.justifyContent,
      }
      const elementObject = {
        required: this.element.required ,
        label: this.element.label,
        placeholder: this.element.placeholder,
        value: this.element.value,
        style,
        parentStyle
      }
      this.dragDrop.setSelectedElement(elementObject)
    })

    this.dragDrop
    .getAddedComponents()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((components) =>{
      console.log(components);
      
      this.addedComponentList = components
    })
  }
  ngAfterViewInit(): void {
    this.dragDrop.setForm(this.formRef)
  }
  drop(event: CdkDragDrop<DragElement[]>) {    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const componentList = this.dragDrop.addedComponentList.getValue()
      const addedElement = componentList[event.currentIndex]
      componentList[event.currentIndex] = {...addedElement , id: this.dragDrop.id++}
    }
  }


  setVisibleInputs(component: DragElement){
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
    this.dragDrop.formControlVisibleChange.next({...visibleInputs})
    return visibleInputs
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
      containerWidth: component.parentStyle?.width.replace(/[^0-9]/g,''),
    }
    this.dragDrop.elementStyle.patchValue(elementStyle);
    this.store.dispatch(elementStyleValueChange(elementStyle))
  }

  handleSelect(component: DragElement){
    if(component.id == this.dragDrop.selectedElementId){
      this.dragDrop.unselectElement()
      return 
    }
    this.dragDrop.selectElement(component)
    this.setCurrentStylesToElement(component)
    this.setVisibleInputs(component)
  }

  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
