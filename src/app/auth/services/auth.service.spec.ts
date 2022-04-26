import { HttpClientModule } from '@angular/common/http';
import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { User } from 'src/app/interfaces/User.interface';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#login should check is successful login user', () => {
    const user: User = {
      email: 'roma@gmail.com',
      password: '1234'
    }
    service.login(user)
    .subscribe(val =>{
      expect(val).toBeTruthy();
    })
  });

  it('#doLoginUser should set and login user', () => {
    const loginInfo = {
      user: {
        confirmPassword: "1234",
        email: "roma@gmail.com",
        id: 1,
        login: "roma"
      }
    }
    service.loggedUser
    .subscribe(val =>{
      expect(val?.email).toEqual(loginInfo.user.email)
    })
    service.doLoginUser(loginInfo)

  });

  it('#doLogoutUser should logout user', () => {
    service.loggedUser
    .subscribe(val =>{
      expect(val).toBeFalsy()
    })
    service.doLogoutUser()
  });

  it('#isAuthenticated should check if is authenticated', () => {
    const user: User = {
      email: 'roma@gmail.com',
      password: '1234'
    }
    service.login(user)
    .subscribe(val =>{
      expect(service.isAuthenticated()).toBeTruthy()
    })
    service.doLogoutUser()
    expect(service.isAuthenticated()).toBeFalsy()

  });
  
});
