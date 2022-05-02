import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap, pipe, mapTo, catchError, of, Subject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { User } from '../../interfaces/User.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly loggedUser: Subject<User | null> = new Subject<User | null>();
  readonly loginError: Subject<string | null> = new Subject<string | null>();

  private readonly JWT_TOKEN = 'JWT_TOKEN';

  constructor(public jwtHelper: JwtHelperService,
              private http: HttpClient) { 
    if(!this.isAuthenticated()) return
    const id = this.getUserByToken().sub
    this.http.get<any>(`${environment.apiURL}/users/${id}`)
    .subscribe(val =>{
      this.loggedUser.next(val)
    })
  }
  getUserByToken(): any {
    const token: string = this.getToken()
    const userByToken = this.getDecodedAccessToken(token)
    return userByToken
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.JWT_TOKEN) || ''  
    return !this.jwtHelper.isTokenExpired(token)
  }
  doLoginUser(loginInfo: any){
    const user = loginInfo.user
    const token = loginInfo.accessToken
    this.loggedUser.next(user)
    this.storeToken(token)
    this.loginError.next(null)
  }
  login(user: User): Observable<boolean>{
    return this.http.post<any>(`${environment.apiURL}/login`, user)
    .pipe(
      tap(token => this.doLoginUser(token)),
      mapTo(true),
      catchError(error => {
        this.loginError.next(error)
        console.error(error.error);
        return of(false);
      }));
  }
  doLogoutUser() {
    this.loggedUser.next(null)
    this.removeToken()
  }
  logout() {
    this.doLogoutUser()
  }

  private storeToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }
  private removeToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  private getToken(): string {
    return localStorage.getItem(this.JWT_TOKEN) || '';
  }
}
