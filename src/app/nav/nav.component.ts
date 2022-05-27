import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public user$: Observable<User | null>;

  constructor(public auth: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.user$ = this.auth.loggedUser;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
