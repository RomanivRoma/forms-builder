import { CdkDragEnter } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { DragElement } from 'src/app/interfaces/DragElement.interface';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-item',
  templateUrl: './drop-item.component.html',
  styleUrls: ['./drop-item.component.css'],
})
export class DropItemComponent implements OnInit {

  @Input() component: DragElement;
  @Input() isSelected: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
