import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap, mapTo, catchError, of, Subject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { User } from '../../interfaces/user.interface';
import { LoggedUser } from 'src/app/interfaces/logged-user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly loggedUser$: Subject<User | null> = new Subject<User | null>();
  public readonly loginError$: Subject<string | null> = new Subject<string | null>();
  public readonly isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private readonly JWT_TOKEN = 'JWT_TOKEN';

  constructor(public jwtHelper: JwtHelperService, private http: HttpClient) {
    if (this.isAuthenticated()) {
      this.isAuthenticated$.next(true);
    }
  }

  public getUserByToken(): JwtPayload | null {
    const token: string = this.getToken();
    return this.getDecodedAccessToken(token);
  }
  public getDecodedAccessToken(token: string): JwtPayload | null {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  public isAuthenticated(): boolean {
    const token: string = localStorage.getItem(this.JWT_TOKEN) || '';
    return !this.jwtHelper.isTokenExpired(token);
  }
  public doLoginUser(loginInfo: LoggedUser): void {
    const user = loginInfo.user;
    const token = loginInfo.accessToken;
    this.loggedUser$.next(user);
    this.isAuthenticated$.next(true);    
    this.storeToken(token);
    this.loginError$.next(null);
  }
  public login(user: User): Observable<boolean> {
    return this.http.post<LoggedUser>(`${environment.apiURL}/login`, user).pipe(
      tap((token: LoggedUser) => this.doLoginUser(token)),
      mapTo(true),
      catchError((error) => {
        this.loginError$.next(error);
        console.error(error);
        return of(false);
      })
    );
  }
  public doLogoutUser(): void {
    this.loggedUser$.next(null);
    this.isAuthenticated$.next(false);
    this.removeToken();
  }
  public logout(): void {
    this.doLogoutUser();
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }
  private removeToken(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  public getToken(): string {
    return localStorage.getItem(this.JWT_TOKEN) || '';
  }
}
