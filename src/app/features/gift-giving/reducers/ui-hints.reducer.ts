import { createReducer, on } from '@ngrx/store';
import * as sortFilterActions from '../actions/sort-filter.actions';
import { Action } from '@ngrx/store';
import * as fromHolidaysActions from '../actions/holidays.actions';
import * as fromFriendsActions from '../actions/friends.actions';

export interface UiHintsState {
  showAll: boolean;
  sortHolidaysBy: string; // 'name' | 'date'
  holidaysLoaded: boolean;
  friendsLoaded: boolean;
}

const initialState: UiHintsState = {
  showAll: true,
  sortHolidaysBy: 'name',
  holidaysLoaded: false,
  friendsLoaded: false
};

const myReducer = createReducer(
  initialState,
  on(sortFilterActions.filterShowAll, (state) => ({ ...state, showAll: true })),
  on(sortFilterActions.filterShowOnlyUpcoming, (state) => ({ ...state, showAll: false })),
  on(sortFilterActions.sortHolidaysByDate, (state) => ({ ...state, sortHolidaysBy: 'date' })),
  on(sortFilterActions.sortHolidaysByName, (state) => ({ ...state, sortHolidaysBy: 'name' })),
  on(fromHolidaysActions.loadHolidayData, (state) => ({ ...state, holidaysLoaded: false })),
  on(fromHolidaysActions.loadDataSucceeded, (state) => ({ ...state, holidaysLoaded: true })),
  on(fromFriendsActions.loadFriendData, (state) => ({ ...state, friendsLoaded: false })),
  on(fromFriendsActions.loadFriendDataSucceeded, (state) => ({ ...state, friendsLoaded: true }))
);

export function reducer(state: UiHintsState, action: Action): UiHintsState {
  return myReducer(state, action);
}
