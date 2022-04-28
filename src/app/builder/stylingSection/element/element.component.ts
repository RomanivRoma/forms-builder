import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, share, shareReplay, Subject, takeUntil } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { DragElement } from 'src/app/interfaces/DragElement.interface';
import { elementStyleValueChange } from '../../actions/element.actions';
import { DragDropService } from '../../services/drag-drop.service';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  isFormControlVisible: any;
  destroy$: Subject<boolean> = new Subject();
  selectedElementId: number | null;

  constructor(public dragDrop: DragDropService) { }

  ngOnInit(): void {
    this.dragDrop.getFormControlVisibleChange()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(val =>{
      this.isFormControlVisible = val
    })
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
