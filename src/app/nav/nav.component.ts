import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../interfaces/User.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  
  user: User | null;

  constructor(public auth: AuthService,
              public router: Router) { 
  }

  ngOnInit(): void {
    this.auth.loggedUser.subscribe(val =>{
      this.user = val
    })
  }

  logout(): void {
    this.auth.logout()
    this.router.navigate(['/login'])
  }
}
