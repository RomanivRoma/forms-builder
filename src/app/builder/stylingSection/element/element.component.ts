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
  handleRemoveComponent(id: number | null){
    if(!id) return
    this.dragDrop.removeElement(id)
    this.dragDrop.unselectElement()
  }
  handleUnselect(){
    this.dragDrop.unselectElement()
  }
}
