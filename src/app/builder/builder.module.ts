import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragComponent } from './dragSection/drag/drag.component';
import { DropComponent } from './dropSection/drop/drop.component';
import { StylingComponent } from './stylingSection/styling/styling.component'
import { HomeComponent } from '../home/home.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    DragComponent,
    DropComponent,
    StylingComponent,
    HomeComponent,

  ],
  imports: [
    CommonModule,
    DragDropModule,
    BrowserAnimationsModule
  ]
})
export class BuilderModule { }
