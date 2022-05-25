import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}
  
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    try {
      if (this.authService.isAuthenticated()) {
        request = request.clone({
          setHeaders: {
            Authorization: this.authService.getToken()
          }
        })
      }
    } catch(e) {
      console.error('Error in interceptor:\n', e);
    }
    
    return next.handle(request);
  }
}
