import { Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class AuthState {
  constructor(
    public apiKey?: string,
    public domain?: string
  ) {}
}

export function authReducer(state: AuthState = new AuthState(), action: AuthActions) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...(<LoginAuthAction>action).payload
      };

    case LOGOUT:
      return new AuthState();

    default:
      return state;
  }
}

export class LoginAuthAction implements Action {
  public type = LOGIN;
  constructor(
    public payload: AuthState
  ) {

  }
}

export class LogoutAuthAction implements Action {
  public type = LOGOUT;
  constructor() {}
}


export type AuthActions = (LoginAuthAction | LogoutAuthAction)
