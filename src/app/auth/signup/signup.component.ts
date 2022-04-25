import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  destroy$: Subject<boolean> = new Subject();

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
  
  submit(): void {
    this.http.post<any>(`${environment.apiURL}/signup`, this.form.getRawValue())
    .pipe(
      takeUntil(this.destroy$),
    )
      .subscribe(res => this.router.navigate(['/login']))
  }

}
