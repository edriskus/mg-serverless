import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../reducers/auth.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public navbarCollapsed: boolean = true;
  public auth$: Observable<AuthState>;

  constructor(
    private store: Store<any>
  ) {
    this.auth$ = this.store.select('auth');
  }

  ngOnInit() {
  }

}
