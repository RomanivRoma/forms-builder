import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  


  constructor(public auth: AuthService,
              public router: Router) { 
  }

  ngOnInit(): void {
    if(!this.auth.isAuthenticated()) return
  }


  logout(): void {
    this.auth.logout()
    this.router.navigate(['/login'])
  }
}
