import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { ComponentStyle } from 'src/app/enums/style-enum.model';
import { VisibleControls } from 'src/app/interfaces/visible-controls.interface';
import { DragDropService } from '../../services/drag-drop.service';
@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
})
export class ElementComponent {
  public controlVisible$: Observable<VisibleControls>;
  private destroy$: Subject<boolean> = new Subject();
  public selectedElementId: number | null;
  public componentStyleElement: ComponentStyle = ComponentStyle.element;

  constructor(public dragDrop: DragDropService) {}

  public ngOnInit(): void {
    this.controlVisible$ = this.dragDrop.getFormControlVisibleChange();

    this.dragDrop
      .getSelectedElementId()
      .pipe(takeUntil(this.destroy$))
      .subscribe((id) => (this.selectedElementId = id));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  
  public handleRemoveElement(): void {
    const id = this.selectedElementId;
    if (!id) return;
    this.dragDrop.removeElement(id);
    this.dragDrop.unselectElement();
  }

  public handleUnselect(): void{
    this.dragDrop.unselectElement();
  }
}
