import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { BuilderModule } from './builder/builder.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ResizableModule } from 'angular-resizable-element';
import { PortalModule } from '@angular/cdk/portal';
import { StoreModule } from '@ngrx/store';
import { formReducer } from './builder/reducers/form.reducer';
import { elementReducer } from './builder/reducers/element.reducers';
import { ReactiveComponentModule } from '@ngrx/component';
import { TokenInterceptor } from './auth/interceptors/token-interceptor.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    BrowserAnimationsModule,
    BuilderModule,
    // ResizableModule,
    ReactiveComponentModule,
    PortalModule,
    StoreModule.forRoot({
      form: formReducer,
      element: elementReducer,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
