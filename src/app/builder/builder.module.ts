import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragComponent } from './dragSection/drag.component';
import { DropComponent } from './dropSection/drop/drop.component';
import { StylingComponent } from './stylingSection/styling.component'
import { HomeComponent } from '../home/home.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { PortalModule } from '@angular/cdk/portal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnectFormDirective } from './directives/connect-form.directive';

@NgModule({
  declarations: [
    DragComponent,
    DropComponent,
    StylingComponent,
    HomeComponent,
    ConnectFormDirective,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    BrowserAnimationsModule,
    // MatFormFieldModule,
    MatButtonToggleModule,
    // MatIconModule
    PortalModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class BuilderModule { }
