import { Component, ElementRef, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { DragElement } from '../../../interfaces/DragElement.interface';
import {CdkDragDrop, moveItemInArray, copyArrayItem, CdkDragEnter, CdkDragMove} from '@angular/cdk/drag-drop';
import { environment } from 'src/environments/environment';
import { DragDropService } from '../../services/drag-drop.service';
@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.css']
})
export class DropComponent implements OnInit {
  @Output() onSelectElement = new EventEmitter<DragElement>()
  @ViewChild('dropListContainer') dropListContainer?: ElementRef;

  selectedElementIndex: number | null

  addedComponents:DragElement[] = []

  drop(event: CdkDragDrop<DragElement[]>) {
    
    // if (event.previousContainer.id === 'cdk-drop-list-0') {
    //   event.container.data.splice(event.currentIndex, 0,
    //     event.previousContainer.data[event.previousIndex]);
    // }
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
    console.log($event);
    const element = $event.target as HTMLElement
    if(element.tagName == 'IMG'){
      if(element.className.includes('delete')){
        this.handleRemoveComponent(index)
        this.handleUnselect()
      }
      else if(element.className.includes('confirm')){
        this.handleUnselect()
      }
      else if(element.className.includes('confirm')){
        this.handleUnselect()
      }

      return
    }
    this.selectedElementIndex = index
    this.dragDrop.setSelectedElement(index, element)
  }

  constructor(private dragDrop: DragDropService) { }
  handleRemoveComponent(index: number){
    this.addedComponents.splice(index, 1);
  }
  handleUnselect(){
    this.selectedElementIndex = null
    this.dragDrop.setSelectedElement(null, null)
  }


  dropListReceiverElement?: HTMLElement;
  dragDropInfo?: {
    dragIndex: number;
    dropIndex: number;
  };
  entered(event: CdkDragEnter) {
    moveItemInArray(this.addedComponents, event.item.data, event.container.data);
  }

  ngOnInit(): void {
    this.addedComponents = this.dragDrop.getAddedComponents()
  }

}
