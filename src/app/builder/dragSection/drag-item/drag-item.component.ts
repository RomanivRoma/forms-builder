import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, Output } from '@angular/core';
import { DragElement } from 'src/app/interfaces/drag-element.interface';
import { EventEmitter } from '@angular/core';
import { CdkDragStart } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-item',
  templateUrl: './drag-item.component.html',
  styleUrls: ['./drag-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragItemComponent implements OnInit {


  @Input() component: DragElement;
  @Output() onAdd = new EventEmitter<DragElement>();

  constructor() { }

  ngOnInit(): void {
  }
  
  addComponent(component: DragElement){
    this.onAdd.emit(component)
  }

}
