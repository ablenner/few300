export const featureName = 'giftGiving';
import * as fromHolidays from './holidays.reducer';
import * as fromUiHints from './ui-hints.reducer';
import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import { HolidayListItem } from '../models';

export interface GiftGivingState {
  holidays: fromHolidays.HolidayState;
  uiHints: fromUiHints.UiHintsState;
}

export const reducers: ActionReducerMap<GiftGivingState> = {
  // action reducer map gives a build error if the interface doesn't match this object
  holidays: fromHolidays.reducer,
  uiHints: fromUiHints.reducer
};

// feature selector
const selectFeature = createFeatureSelector<GiftGivingState>(featureName);
// selector per branch
const selectHolidaysBranch = createSelector(selectFeature, b => b.holidays);
const selectUiHintsBranch = createSelector(selectFeature, b => b.uiHints);
// helpers
const selectHolidayArray = createSelector(selectHolidaysBranch, fromHolidays.selectHolidayArray);
export const selectShowAllHolidays = createSelector(selectUiHintsBranch, b => b.showAll);
export const selectSortingHolidaysBy = createSelector(selectUiHintsBranch, b => b.sortHolidaysBy);
// then what your components need.

export const selectHolidaysLoaded = createSelector(selectUiHintsBranch, b => b.holidaysLoaded);

const selectHolidayListItemsUnfiltered = createSelector(selectHolidayArray, holidays =>
  holidays.map(holiday => ({
    id: holiday.id,
    date: holiday.date,
    name: holiday.name,
    past: new Date(holiday.date) < new Date(),
    isTemporary: holiday.id.startsWith('T')
  } as HolidayListItem))
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
