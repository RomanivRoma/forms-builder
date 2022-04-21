import { Component, ElementRef, OnInit, EventEmitter, Output, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DragElement } from '../../interfaces/DragElement.interface';
import {CdkDragDrop, moveItemInArray, copyArrayItem, CdkDragEnter, CdkDragMove} from '@angular/cdk/drag-drop';
import { environment } from 'src/environments/environment';
import { first, pipe, shareReplay, single, skip, take, takeUntil, Subject, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { DragDropService } from '../services/drag-drop.service';
@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.css'],
})
export class DropComponent implements OnInit, AfterViewInit {
  
  @Output() onSelectElement = new EventEmitter<DragElement>()
  @ViewChild('dropListContainer') dropListContainer?: ElementRef;
  @ViewChild('mainForm', {static: true}) formRef: ElementRef;
  destroy$: Subject<boolean> = new Subject();
  form: any;
  element: any
  titleStyle: any;
  formStyle: any;
  headerStyle: any;
  elementDisabled: boolean;

  constructor(public dragDrop: DragDropService,
              private store: Store<AppState>,
              private cdr: ChangeDetectorRef) { }

              
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
    .pipe(
      takeUntil(this.destroy$),
      tap(val =>{
        console.log(val);
      })
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
        // this.cdr.detectChanges()
    });
    // this.store.select('element')
    //   .subscribe(val => {
    //     console.log(val);
        
    //     this.element = val
    //     let currentSelectedElement = this.dragDrop.currentSelectedElement
    //     if(!currentSelectedElement) return
    //     const parent = currentSelectedElement.parentElement || currentSelectedElement
    //     currentSelectedElement.placeholder = this.element.placeholder
    //     currentSelectedElement.required = this.element.required 
    //     // currentSelectedElement.value = this.element.value   
    //     currentSelectedElement.innerText = this.element.value    
    //     const elementStyle = {
    //       'color': this.element.fontColor,
    //       'font-size': this.element.fontSize + 'px',
    //       'width': this.element.width + '%',
    //       'height': this.element.height + 'px',
    //       'font-weight': this.element.fontWeight,
    //       'background': this.element.background,
    //       'border-radius': this.element.borderRadius + 'px',
    //       'border-color': this.element.borderColor,
    //       'padding-left': this.element.paddingLeft + 'px',
    //       'padding-top': this.element.paddingTop + 'px',
    //       'padding-right': this.element.paddingRight + 'px',
    //       'padding-bottom': this.element.paddingBottom + 'px',
    //       'margin-left': this.element.marginLeft + 'px',
    //       'margin-top': this.element.marginTop + 'px',
    //       'margin-right': this.element.marginRight + 'px',
    //       'margin-bottom': this.element.marginBottom + 'px',
    //     }
    //     Object.assign(currentSelectedElement.style, elementStyle)
    //     parent.style.width = this.element.containerWidth + '%'
    //     parent.style.justifyContent = this.element.align
    // });
  }
  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
