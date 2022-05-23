import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DragElement } from 'src/app/interfaces/drag-element.interface';

@Component({
  selector: 'app-drop-item',
  templateUrl: './drop-item.component.html',
  styleUrls: ['./drop-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropItemComponent implements OnInit {

  @Input() component: DragElement;
  @Input() isSelected: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
