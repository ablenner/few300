import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as holidayActions from '../actions/holidays.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { HolidayEntity } from '../reducers/holidays.reducer';
import { switchMap, map } from 'rxjs/operators';


@Injectable()
export class HolidaysEffects {

  loadHolidayData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(holidayActions.loadHolidayData),
      // make http request to holidays url. going to use switch map because this call is also observable
      switchMap(() => this.client.get<{ holidays: HolidayEntity[] }>(environment.holidayUrl)
        .pipe(
          map(response => response.holidays),
          map(holidays => holidayActions.loadDataSucceeded({ data: holidays }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private client: HttpClient) { }
}
