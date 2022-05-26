import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  catchError,
  Observable,
  of,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  private destroy$: Subject<boolean> = new Subject();
  public error$: Observable<string | null>;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public submit(): void {
    const { confirmPassword, email, login, password } = this.form.getRawValue();
    const params = {
      email,
      login,
      password,
    };
    if (confirmPassword !== password) {
      this.error$ = of("Passwords aren't equal");
      return;
    }
    this.error$ = this.http
      .post<Error>(`${environment.apiURL}/signup`, params)
      .pipe(
        tap((res) => {
          this.router.navigate(['/login']);
          return res;
        }),
        takeUntil(this.destroy$),
        catchError((error) => of(error))
      );
  }
}
