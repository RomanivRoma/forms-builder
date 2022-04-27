import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragComponent } from './dragSection/drag.component';
import { DropComponent } from './dropSection/drop.component';
import { StylingComponent } from './stylingSection/styling.component'
import { HomeComponent } from '../home/home.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

@NgModule({
  declarations: [
    DragComponent,
    DropComponent,
    StylingComponent,
    HomeComponent,
    ConnectFormDirective,
    ElementComponent,
    FormComponent,
    DragItemComponent,
    DropItemComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    
    PortalModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatIconModule,
  ],
})
export class BuilderModule { }
