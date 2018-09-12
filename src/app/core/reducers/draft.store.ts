import { Action } from '@ngrx/store';

export const UPDATE = 'DRAFT_UPDATE';
export const RESET = 'DRAFT_RESET';

export class DraftState {
  public domain?: string;
  public from?: string;
  public to?: string;
  public subject?: string;
  public text?: string;

  constructor() {}
}

export function draftReducer(state: DraftState = new DraftState(), action: DraftActions) {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...(<UpdateDraftAction>action).payload
      };

    case RESET:
      return new DraftState();

    default:
      return state;
  }
}

export class UpdateDraftAction implements Action {
  public type = UPDATE;
  constructor(
    public payload: DraftState
  ) {

  }
}

export class ResetDraftAction implements Action {
  public type = RESET;
  constructor() {}
}


export type DraftActions = (UpdateDraftAction | ResetDraftAction)
