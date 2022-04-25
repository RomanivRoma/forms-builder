import { Component, OnInit } from '@angular/core';
import { DragElement } from '../../interfaces/DragElement.interface';
import { CdkDragExit, CdkDragStart } from '@angular/cdk/drag-drop';
import { DragDropService } from '../services/drag-drop.service';


@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.css']
})
export class DragComponent implements OnInit {

  componentList: DragElement[];

  constructor(private dragDrop: DragDropService) { }
  noReturnPredicate() {
    return false;
  }
  onSourceListExited(event: CdkDragExit<any>) {
    event.container.data = this.dragDrop.componentList
  }
  handleAdd(item: DragElement): void{
    this.dragDrop.addToForm(item)
  }
  dragStart(event: CdkDragStart<any>){
    this.componentList = [...event.source.dropContainer.data]
  }
  ngOnInit(): void {
    this.componentList = this.dragDrop.componentList
  }
}
