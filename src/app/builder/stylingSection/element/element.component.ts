import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DragDropService } from '../../services/drag-drop.service';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  isFormControlVisible: any;
  destroy$: Subject<boolean> = new Subject();

  constructor(public dragDrop: DragDropService) { }

  ngOnInit(): void {
    this.dragDrop.formControlVisibleChange
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(val =>{
      this.isFormControlVisible = val
    })
  }
  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.complete()
  }
  handleRemoveComponent(id: number){
    this.dragDrop.addedComponentList = this.dragDrop.addedComponentList.filter(el => el.id != id)
    this.handleUnselect()
  }
  handleUnselect(){
    this.dragDrop.setSelectedElement(null)
  }

}
