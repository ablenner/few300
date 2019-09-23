import { createReducer, on } from '@ngrx/store';
import * as sortFilterActions from '../actions/sort-filter.actions';
import { Action } from '@ngrx/store';

export interface UiHintsState {
  showAll: boolean;
  sortHolidaysBy: string; // 'name' | 'date'
}

const initialState: UiHintsState = {
  showAll: true,
  sortHolidaysBy: 'name'
};

const myReducer = createReducer(
  initialState,
  on(sortFilterActions.filterShowAll, (state) => ({ ...state, showAll: true })),
  on(sortFilterActions.filterShowOnlyUpcoming, (state) => ({ ...state, showAll: false })),
  on(sortFilterActions.sortHolidaysByDate, (state) => ({ ...state, sortHolidaysBy: 'date' })),
  on(sortFilterActions.sortHolidaysByName, (state) => ({ ...state, sortHolidaysBy: 'name' }))
);

export function reducer(state: UiHintsState, action: Action): UiHintsState {
  return myReducer(state, action);
}
