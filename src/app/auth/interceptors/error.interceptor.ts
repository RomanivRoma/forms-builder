import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err);

        if ([401, 403].includes(err.status) && this.authService.loggedUser) {
          this.authService.logout();
          this.router.navigate(['login']);
        }

        const error = (err && err.error && err.error.message) || err.statusText;
        console.error(err);
        return throwError(() => error);
      })
    );
  }
}
