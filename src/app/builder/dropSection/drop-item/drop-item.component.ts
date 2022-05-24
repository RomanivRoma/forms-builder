import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { ComponentType } from 'src/app/enums/component-type.model';
import { DragElement } from 'src/app/interfaces/drag-element.interface';

@Component({
  selector: 'app-drop-item',
  templateUrl: './drop-item.component.html',
  styleUrls: ['./drop-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropItemComponent implements OnInit {
  @Input() component: DragElement;
  @Input() isSelected: boolean;
  public eComponentType = ComponentType;

  @HostBinding('style.justify-content')
  get justyfyContent() {
    return this.component?.class == 'custom-text'
      ? ''
      : this.component?.parentStyle?.justifyContent;
  }
  @HostBinding('class')
  get class() {
    return this.component.class;
  }
  @HostBinding('class.selected')
  get elementIsSelected() {
    return this.isSelected;
  }

  constructor() {}

  ngOnInit(): void {}
}
