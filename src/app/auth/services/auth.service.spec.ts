import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { User } from 'src/app/interfaces/user.interface';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let user: User;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(AuthService);
    user = {
      email: 'roma@gmail.com',
      password: '1234'
    }
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#login should check is successful login user', () => {
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
    // service.doLoginUser(loginInfo)
  });

  it('#doLogoutUser should logout user', () => {
    service.loggedUser
    .subscribe(val =>{
      expect(val).toBeFalsy()
    })
    service.doLogoutUser()
  });

  it('#isAuthenticated should check if is authenticated', () => {
    
    service.login(user)
    .subscribe(val =>{
      expect(service.isAuthenticated()).toBeTruthy()
    })
    service.doLogoutUser()
    expect(service.isAuthenticated()).toBeFalsy()

  });

  it('#getUserByToken should return user by using jwt tocken', () => {
    service.login(user)
    .subscribe(val =>{
      // const email: string | null = service.getUserByToken()?.email
      expect(val).toBe(true)
    })
    service.doLogoutUser()
    expect(service.getUserByToken()).toBeFalsy()

  });
  
});
