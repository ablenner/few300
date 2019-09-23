import { createReducer, on } from '@ngrx/store';
import * as sortFilterActions from '../actions/sort-filter.actions';
import { Action } from '@ngrx/store';

export interface UiHintsState {
  showAll: boolean;
}

const initialState: UiHintsState = {
  showAll: true
};

const myReducer = createReducer(
  initialState,
  on(sortFilterActions.filterShowAll, () => ({ showAll: true })),
  on(sortFilterActions.filterShowOnlyUpcoming, () => ({ showAll: false }))
);

export function reducer(state: UiHintsState, action: Action): UiHintsState {
  return myReducer(state, action);
}
