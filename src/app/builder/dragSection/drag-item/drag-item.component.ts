import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core';
import { DragElement } from 'src/app/interfaces/drag-element.interface';
import { EventEmitter } from '@angular/core';
import { ComponentTag } from 'src/app/enums/component-tag.model';

@Component({
  selector: 'app-drag-item',
  templateUrl: './drag-item.component.html',
  styleUrls: ['./drag-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragItemComponent {
  @Input() component: DragElement;
  @Output() onAdd = new EventEmitter<DragElement>();
  public eComponentTag = ComponentTag;

  constructor() {}

  public ngOnInit(): void {}

  public addComponent(component: DragElement) {
    this.onAdd.emit(component);
  }
}
