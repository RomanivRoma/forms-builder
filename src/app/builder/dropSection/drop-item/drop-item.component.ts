import { Component, Input, OnInit } from '@angular/core';
import { DragElement } from 'src/app/interfaces/DragElement.interface';

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
