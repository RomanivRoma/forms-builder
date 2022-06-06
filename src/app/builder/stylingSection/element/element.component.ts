import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { VisibleControls } from 'src/app/interfaces/visible-controls.interface';
import { DragDropService } from '../../services/drag-drop.service';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
})
export class ElementComponent implements OnInit {
  public controlVisible$: Observable<VisibleControls>;
  private destroy$: Subject<boolean> = new Subject();
  public selectedElementId: number | null;

  constructor(public dragDrop: DragDropService) {}

  public ngOnInit(): void {
    this.controlVisible$ = this.dragDrop.getFormControlVisibleChange();

    this.dragDrop
      .getSelectedElementId()
      .pipe(takeUntil(this.destroy$))
      .subscribe((id) => (this.selectedElementId = id));
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  public handleRemoveElement() {
    const id = this.selectedElementId;
    if (!id) return;
    this.dragDrop.removeElement(id);
    this.dragDrop.unselectElement();
  }
  public handleUnselect() {
    this.dragDrop.unselectElement();
  }
}
