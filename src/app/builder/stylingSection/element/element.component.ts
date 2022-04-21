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

  handleSelect($event: Event){
    const element = ($event.target as HTMLInputElement) 
    if(element.className.includes('delete')){
      this.handleRemoveComponent(this.dragDrop.currentSelectedElementIndex || 0)
      this.handleUnselect()
    }
    else if(element.className.includes('confirm')){
      this.handleUnselect()
    }
  }
  handleRemoveComponent(index: number){
    this.dragDrop.addedComponentList.splice(index, 1);
  }
  handleUnselect(){
    this.dragDrop.setSelectedElement(null, null)
  }

}
