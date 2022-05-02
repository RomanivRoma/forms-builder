import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DragDropService } from '../../services/drag-drop.service';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  controlVisible$: Observable<any>;
  destroy$: Subject<boolean> = new Subject();
  selectedElementId: number | null;

  constructor(public dragDrop: DragDropService) { }

  ngOnInit(): void {
    this.controlVisible$ = this.dragDrop.getFormControlVisibleChange()
    .pipe(
      takeUntil(this.destroy$)
    )
    
    this.dragDrop.getSelectedElementId()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(id =>{
      this.selectedElementId = id
    })
  }

  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.complete()
  }
  handleRemoveElement(){
    const id = this.selectedElementId
    if(!id) return
    this.dragDrop.removeElement(id)
    this.dragDrop.unselectElement()
  }
  handleUnselect(){
    this.dragDrop.unselectElement()
  }
}
