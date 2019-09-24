export const featureName = 'giftGiving';
import * as fromHolidays from './holidays.reducer';
import * as fromUiHints from './ui-hints.reducer';
import * as fromFriends from './friends.reducer';
import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import { HolidayListItem, FriendListItem } from '../models';

export interface GiftGivingState {
  holidays: fromHolidays.HolidayState;
  uiHints: fromUiHints.UiHintsState;
  friends: fromFriends.FriendState;
}

export const reducers: ActionReducerMap<GiftGivingState> = {
  // action reducer map gives a build error if the interface doesn't match this object
  holidays: fromHolidays.reducer,
  uiHints: fromUiHints.reducer,
  friends: fromFriends.reducer
};

// feature selector
const selectFeature = createFeatureSelector<GiftGivingState>(featureName);
// selector per branch
const selectHolidaysBranch = createSelector(selectFeature, b => b.holidays);
const selectUiHintsBranch = createSelector(selectFeature, b => b.uiHints);
const selectFriendsBranch = createSelector(selectFeature, b => b.friends);
// helpers
const selectHolidayArray = createSelector(selectHolidaysBranch, fromHolidays.selectHolidayArray);
const selectFriendArray = createSelector(selectFriendsBranch, fromFriends.selectFriendArray);
export const selectShowAllHolidays = createSelector(selectUiHintsBranch, b => b.showAll);
export const selectSortingHolidaysBy = createSelector(selectUiHintsBranch, b => b.sortHolidaysBy);
// then what your components need.

export const selectHolidaysLoaded = createSelector(selectUiHintsBranch, b => b.holidaysLoaded);
export const selectFriendsLoaded = createSelector(selectUiHintsBranch, b => b.friendsLoaded);

const selectHolidayListItemsUnfiltered = createSelector(selectHolidayArray, holidays =>
  holidays.map(holiday => ({
    id: holiday.id,
    date: holiday.date,
    name: holiday.name,
    past: new Date(holiday.date) < new Date(),
    isTemporary: holiday.id.startsWith('T')
  } as HolidayListItem))
);

export const selectFriendListItems = createSelector(selectFriendArray, friends =>
  friends.map(friend => ({
    id: friend.id,
    name: friend.name,
    isTemporary: friend.id.startsWith('T')
  } as FriendListItem))
);

const selectHolidayListSorted = createSelector(selectHolidayListItemsUnfiltered, selectSortingHolidaysBy,
  (list, by) => {
    return [...list.sort((lhs, rhs) => {
      if (lhs[by] < rhs[by]) {
        return -1;
      }
      if (lhs[by] > rhs[by]) {
        return 1;
      }
      return 0;
    })];
  }
);
export const selectHolidayListItems = createSelector(selectShowAllHolidays, selectHolidayListSorted, (all, holidays) =>
  holidays.filter(h => all ? true : !h.past)
);
