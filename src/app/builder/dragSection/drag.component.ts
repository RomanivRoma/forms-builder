import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DragElement } from '../../interfaces/DragElement.interface';
import {CdkDragEnter, CdkDragExit, CdkDragStart} from '@angular/cdk/drag-drop';
import { DragDropService } from '../services/drag-drop.service';
import { SwitcherPortalService } from '../services/switcher-portal.service';


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
    console.log(event, 'exit');
  }
  handleAdd(item: DragElement): void{
    this.dragDrop.addToForm(item)
  }
  dragStart(event: CdkDragStart<any>){
    this.componentList = [...event.source.dropContainer.data]
  }
  onSourceListEntered(event: CdkDragEnter<any>) {
    // console.log(event, 'enter');

  }
  ngOnInit(): void {
    this.componentList = this.dragDrop.componentList
  }
}
