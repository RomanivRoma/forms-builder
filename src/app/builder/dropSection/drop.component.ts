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
  selectedElementId: number | null

  constructor(public dragDrop: DragDropService,
              private store: Store<AppState>) { }
              

  ngOnInit(): void {
    this.store
    .select('form')
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

    this.store
    .select('element')
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(val => {
      this.element = val
      const style = {
        'color': this.element.color,
        'fontSize.px': this.element.fontSize,
        'width.%': this.element.width,
        'height.px': this.element.height,
        'fontWeight': this.element.fontWeight,
        'background': this.element.background,
        'borderRadius.px': this.element.borderRadius,
        'borderColor': this.element.borderColor,
        'paddingLeft.px': this.element.paddingLeft,
        'paddingTop.px': this.element.paddingTop,
        'paddingRight.px': this.element.paddingRight,
        'paddingBottom.px': this.element.paddingBottom,
        'marginLeft.px': this.element.marginLeft,
        'marginTop.px': this.element.marginTop,
        'marginRight.px': this.element.marginRight,
        'marginBottom.px': this.element.marginBottom,
      }
      const parentStyle = {
        'width': this.element.containerWidth,
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
      this.addedComponentList = components
    })

    this.dragDrop
    .getSelectedElementId()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((id) =>{
      this.selectedElementId = id
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
      const componentList = this.addedComponentList
      const addedElement = componentList[event.currentIndex]
      componentList[event.currentIndex] = {...addedElement , id: this.dragDrop.id++}
    }
  }
  setVisibleInputs(component: DragElement){
    return this.dragDrop.setFormControlVisibleChange(component)
  }
  setCurrentStylesToElement(component: DragElement){
    let elementStyle:any = {}
    Object.keys(component?.style || []).forEach(el =>{
      const splittedStyle = el.split('.')
      elementStyle[splittedStyle.length > 1 ? splittedStyle[0] : el] = component.style[el]
    })
    
    elementStyle = {
      ...elementStyle,
      label: component?.label || '',
      placeholder: component?.placeholder || '',
      value: component?.value || '',
      required: component?.required || false,
      containerWidth: component.parentStyle?.width,
      justifyContent: component.parentStyle?.justifyContent,
    }
    
    this.dragDrop.elementStyle.patchValue(elementStyle);
    this.store.dispatch(elementStyleValueChange(elementStyle))
  }

  handleSelect(component: DragElement){
    if(component.id == this.selectedElementId){
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
