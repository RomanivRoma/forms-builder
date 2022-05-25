import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragComponent } from './dragSection/drag.component';
import { DropComponent } from './dropSection/drop.component';
import { StylingComponent } from './stylingSection/styling.component'
import { HomeComponent } from '../home/home.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnectFormDirective } from './directives/connect-form.directive';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ElementComponent } from './stylingSection/element/element.component';
import { FormComponent } from './stylingSection/form/form.component';
import { DragItemComponent } from './dragSection/drag-item/drag-item.component';
import { DropItemComponent } from './dropSection/drop-item/drop-item.component';
import { ReactiveComponentModule } from '@ngrx/component';
import { LetContextDirective } from './directives/let-context.directive';
import { BuilderComponent } from './builder/builder.component';
import { RouterModule, Routes } from '@angular/router';
import { IndentInputComponent } from './stylingSection/indent-input/indent-input.component';
import { AlignInputComponent } from './stylingSection/align-input/align-input.component';

const routes:Routes = [
  { path: 'builder', component: BuilderComponent } 
]

@NgModule({
  declarations: [
    DragComponent,
    DropComponent,
    StylingComponent,
    ConnectFormDirective,
    ElementComponent,
    FormComponent,
    DragItemComponent,
    DropItemComponent,
    LetContextDirective,
    BuilderComponent,
    IndentInputComponent,
    AlignInputComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    ReactiveComponentModule,
    PortalModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ],

  exports: [
    DragComponent,
    DropComponent,
    StylingComponent,
    BuilderComponent
  ],
})
export class BuilderModule { }
