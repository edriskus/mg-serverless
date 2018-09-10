import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginAuthAction, AuthState } from '../../core/reducers/auth.store';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public authForm: FormGroup;
  public auth$: Observable<AuthState>;

  constructor(
    private store: Store<any>,
    private fb: FormBuilder
  ) {
    this.auth$ = this.store.select('auth');
  }

  ngOnInit() {
    this.buildAuthForm();
  }

  private buildAuthForm(): void {
    this.authForm = this.fb.group({
      apiKey: [null, Validators.required]
    })
  }

  public forgetAuth(): void {
    this.authForm.reset();
    this.store.dispatch(new LoginAuthAction(new AuthState()));
  }

  public saveAuth(): void {
    if(!this.authForm.valid) {
      this.authForm.get('apiKey').markAsDirty();
      return;
    }
    this.store.dispatch(
      new LoginAuthAction(
        new AuthState(this.authForm.value.apiKey)
      )
    )
  }

  public getApiKey(auth: AuthState): string {
    if(auth) {
      return `**********${auth.apiKey.substring(auth.apiKey.length - 5)}`
    } else return `-`;
  }

}
