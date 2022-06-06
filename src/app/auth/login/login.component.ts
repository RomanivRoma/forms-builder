import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  private destroy$: Subject<boolean> = new Subject();
  public error$: Observable<string | null>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
    this.error$ = this.authService.loginError$.pipe(takeUntil(this.destroy$));
  }
  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public submit(): void {
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.authService
      .login(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['/']);
        }
      });
  }
}
