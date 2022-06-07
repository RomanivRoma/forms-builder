import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderModule } from '../builder/builder.module';
import { StylingComponent } from '../builder/stylingSection/styling.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes:Routes = [
  { path: '', component: HomeComponent } 
]


@NgModule({
  declarations: [
    HomeComponent
  ],  
  imports: [
    CommonModule,
    RouterModule,
    BuilderModule,
    RouterModule.forChild(routes)
  ],
})
export class HomeModule { }
