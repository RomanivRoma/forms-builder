import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ReactiveComponentModule } from '@ngrx/component';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ]
})
export class AuthModule { }
