import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, mapTo, Observable, of, Subject, takeUntil, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  destroy$: Subject<boolean> = new Subject();
  error$: Observable<any>;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  }
  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.complete()
  }

  submit(): void{
    const { confirmPassword, email, login, password } = this.form.getRawValue()
    const params = {
      email,
      login,
      password
    }
    if(confirmPassword !== password){
      this.error$ = of({error: "Passwords aren't equal"})
      return
    }
    this.error$ = this.http.post<any>(`${environment.apiURL}/signup`, params)
    .pipe(
      tap(res =>{
        this.router.navigate(['/login'])
        return res
      }),
      takeUntil(this.destroy$),
      catchError(error => of(error))
    )
  }

}
