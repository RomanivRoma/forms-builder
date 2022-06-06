import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DragElement } from '../../interfaces/drag-element.interface';
import { DragDropService } from '../services/drag-drop.service';
import { environment } from 'src/environments/environment';
import { componentList } from './components';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragComponent implements OnInit {
  public componentList: DragElement[] = componentList;

  constructor(private dragDrop: DragDropService) {}

  public ngOnInit(): void {}

  public noReturnPredicate() {
    return false;
  }
  public handleAdd(item: DragElement): DragElement {
    return this.dragDrop.addElement(item);
  }
}
