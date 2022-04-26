import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DragElement } from '../../interfaces/DragElement.interface';
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { takeUntil, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { DragDropService } from '../services/drag-drop.service';
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

  constructor(public dragDrop: DragDropService,
              private store: Store<AppState>) { }
              
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
      const addedElement = this.dragDrop.addedComponentList[event.currentIndex]
      this.dragDrop.addedComponentList[event.currentIndex] = {...addedElement , id: this.dragDrop.id++}
    }
  }
  handleSelect(component: DragElement){
    this.dragDrop.setSelectedElement(component)
  }
  ngAfterViewInit(): void {
    this.dragDrop.setForm(this.formRef)
  }
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
        const selectedElementObject = this.dragDrop.selectedElementObject
        if(!selectedElementObject) return
        selectedElementObject.required = this.element.required 
        selectedElementObject.label = this.element.label
        selectedElementObject.placeholder = this.element.placeholder
        selectedElementObject.value = this.element.value
        const elementStyle = {
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
        selectedElementObject.style = elementStyle
        selectedElementObject.parentStyle = {
          'width': this.element.containerWidth + '%',
          'justifyContent': this.element.justifyContent,
        }        
      })
  }
  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
