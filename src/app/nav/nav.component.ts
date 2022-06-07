import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  public user$: Observable<User | null>;
  public isAuthenticated$: BehaviorSubject<boolean>;
  constructor(public auth: AuthService, public router: Router) {}

  public ngOnInit(): void {
    this.user$ = this.auth.loggedUser$;
    this.isAuthenticated$ = this.auth.isAuthenticated$;
  }

  public logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
