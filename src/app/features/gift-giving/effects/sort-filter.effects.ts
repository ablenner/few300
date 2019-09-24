import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions/sort-filter.actions';
import { map, tap, filter } from 'rxjs/operators';

@Injectable()
export class SortFilterEffects {

  // 1. when we get the loadPrefs, get them from localstorage and dispatch actions
  loadSort$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadSavedPrefs),
      map(() => localStorage.getItem('holiday-sort')), // we give: 'name' | 'date' | null
      filter(savedSort => savedSort != null), // gets rid of null option
      map(savedSort => {
        if (savedSort === 'name') {
          return actions.sortHolidaysByName();
        } else {
          return actions.sortHolidaysByDate();
        }
      })
    )
  );

  loadFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadSavedPrefs),
      map(() => localStorage.getItem('holiday-filter')),
      filter(savedFilter => savedFilter !== null),
      map(savedFilter => {
        if (savedFilter === 'all') {
          return actions.filterShowAll();
        } else {
          return actions.filterShowOnlyUpcoming();
        }
      })
    ));

  // 2. when sort is changed, save it
  saveSortHolidayName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.sortHolidaysByName),
      tap(() => localStorage.setItem('holiday-sort', 'name'))
    ), { dispatch: false }
  );

  saveSortHolidayDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.sortHolidaysByDate),
      tap(() => localStorage.setItem('holiday-sort', 'date'))
    ), { dispatch: false }
  );
  // 3. when filter is changed, save it
  saveFilterAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.filterShowAll),
      tap(() => localStorage.setItem('holiday-filter', 'all'))
    ), { dispatch: false }
  );

  saveFilterUpcoming$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.filterShowOnlyUpcoming),
      tap(() => localStorage.setItem('holiday-filter', 'upcoming'))
    ), { dispatch: false }
  );

  constructor(private actions$: Actions) { }
}
