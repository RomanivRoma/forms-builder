import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../../interfaces/user.interface'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    })
  }



  submit(): void {
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.authService.login(user)
    .subscribe(res => {
      if(res){
        this.router.navigate(['/'])
      }
    })
  }
}
