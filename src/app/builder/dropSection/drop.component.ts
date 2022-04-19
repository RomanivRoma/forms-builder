import { Component, ElementRef, OnInit, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import { DragElement } from '../../interfaces/DragElement.interface';
import {CdkDragDrop, moveItemInArray, copyArrayItem, CdkDragEnter, CdkDragMove} from '@angular/cdk/drag-drop';
import { environment } from 'src/environments/environment';
import { pipe, single, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { DragDropService } from '../services/drag-drop.service';
@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.css']
})
export class DropComponent implements OnInit, AfterViewInit {
  
  @Output() onSelectElement = new EventEmitter<DragElement>()
  @ViewChild('dropListContainer') dropListContainer?: ElementRef;
  @ViewChild('mainForm', {static: true}) formRef: ElementRef;
  form: any;
  element: any
  titleStyle: any;
  formStyle: any;

  dropListReceiverElement?: HTMLElement;
  dragDropInfo?: {
    dragIndex: number;
    dropIndex: number;
  };
  constructor(public dragDrop: DragDropService,
              private store: Store<AppState>) { 
                // localStorage.setItem('JWT_TOKEN', '')
              }

              
  drop(event: CdkDragDrop<DragElement[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  handleSelect($event: Event, index:number){
    const target = ($event.target as HTMLInputElement) 
    const element = target.querySelector('.drop__item') as HTMLInputElement || $event.target as HTMLInputElement
    this.dragDrop.setSelectedElement(index, element)
  }

  entered(event: CdkDragEnter) {
    moveItemInArray(this.dragDrop.addedComponentList, event.item.data, event.container.data);
  }
  ngAfterViewInit(): void {
    this.dragDrop.setForm(this.formRef)
  }
  ngOnInit(): void {
    this.store.select('form')
      .subscribe(val => {
        console.log(val);
        const newStyle: any = val
        this.form = val
        this.titleStyle = {
          'fontSize.px': this.form.fontSize,
          'color': this.form.fontColor,
          'textAlign': this.form.align   
        }
        this.formStyle = {
          'width': this.form.width + (Number.isInteger(this.form.width) ? 'px' : '') ,
          'height': this.form.height  + (Number.isInteger(this.form.height) ? 'px' : '')
        }
    });
    this.store.select('element')
      .subscribe(val => {
        this.element = val
        let currentSelectedElement = this.dragDrop.currentSelectedElement
        if(!currentSelectedElement) return
        const parent = currentSelectedElement.parentElement || currentSelectedElement
        currentSelectedElement.placeholder = this.element.placeholder
        currentSelectedElement.required = this.element.required 
        const elementStyle = {
          'color': this.element.fontColor,
          'font-size': this.element.fontSize + 'px',
          'width': this.element.width + '%',
          'height': this.element.height + 'px',
          'font-weight': this.element.fontWeight,
        }
        Object.assign(currentSelectedElement.style, elementStyle)
        parent.style.width = this.element.containerWidth + '%'
        parent.style.justifyContent = this.element.align
    });
  }

}
