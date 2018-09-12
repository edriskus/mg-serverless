import { Action } from '@ngrx/store';

export const UPDATE = 'DEFAULTS_UPDATE';
export const RESET = 'DEFAULTS_RESET';

export class DefaultsState {

  public domain?: string;
  public from?: string;

  constructor() {}
}

export function defaultsReducer(state: DefaultsState = new DefaultsState(), action: DefaultsActions) {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...(<UpdateDefaultsAction>action).payload
      };

    case RESET:
      return new DefaultsState();

    default:
      return state;
  }
}

export class UpdateDefaultsAction implements Action {
  public type = UPDATE;
  constructor(
    public payload: DefaultsState
  ) {

  }
}

export class ResetDefaultsAction implements Action {
  public type = RESET;
  constructor() {}
}


export type DefaultsActions = (UpdateDefaultsAction | ResetDefaultsAction)
