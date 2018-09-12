import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginAuthAction, AuthState, LogoutAuthAction } from '../../core/reducers/auth.store';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../../data.service';
import { map } from 'rxjs/operators';
import { UpdateDefaultsAction, ResetDefaultsAction, DefaultsState } from '../../core/reducers/defaults.store';
import { ResetDraftAction } from '../../core/reducers/draft.store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public authForm: FormGroup;
  public auth$: Observable<AuthState>;
  public events$: Observable<any>;

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private data: DataService
  ) {
    this.auth$ = this.store.select('auth').pipe(
      map((auth: AuthState) => {
        this.events$ = this.data.getEvents(auth.domain);
        return auth;
      })
    );
  }

  ngOnInit() {
    this.buildAuthForm();
  }

  private buildAuthForm(): void {
    this.authForm = this.fb.group({
      apiKey: [null, Validators.required],
      domain: [null, Validators.required]
    })
  }

  public forgetAuth(): void {
    this.authForm.reset();
    this.store.dispatch(new LogoutAuthAction());
    this.store.dispatch(new ResetDefaultsAction());
    this.store.dispatch(new ResetDraftAction());
  }

  public saveAuth(): void {
    if(!this.authForm.valid) {
      this.authForm.get('apiKey').markAsDirty();
      return;
    }
    this.store.dispatch(
      new LoginAuthAction(
        new AuthState(
          this.authForm.value.apiKey,
          this.authForm.value.domain
        )
      )
    )
    this.store.dispatch(
      new UpdateDefaultsAction({
        domain: this.authForm.value.domain
      })
    )
  }

  public getApiKey(auth: AuthState): string {
    if(auth) {
      return `**********${auth.apiKey.substring(auth.apiKey.length - 5)}`
    } else return `-`;
  }

}
