import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['isAuthenticated']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
        { provide: AuthService, useValue: spy }
      ]
    });
    service = TestBed.inject(AuthGuardService);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#canActivate should check permission to page', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    expect(service.canActivate()).toBeTruthy();
  });
});
