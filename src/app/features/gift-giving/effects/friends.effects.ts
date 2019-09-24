import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as friendActions from '../actions/friends.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { FriendEntity } from '../reducers/friends.reducer';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class FriendsEffects {

  postFriend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(friendActions.friendAdded),
      map(a => a.entity),
      switchMap((originalEntity) =>
        this.client.post<FriendEntity>(environment.friendUrl, { name: originalEntity.name })
          .pipe(
            map(response => friendActions.friendAddedSuccess({ oldId: originalEntity.id, newEntity: response })),
            catchError(err => of(friendActions.friendAddedFailure({ message: 'Could not add that', entity: originalEntity })))
          )
      )
    )
  );

  loadFriendData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(friendActions.loadFriendData),
      switchMap(() => this.client.get<{ friends: FriendEntity[] }>(environment.friendUrl)
        .pipe(
          map(response => response.friends),
          map(friends => friendActions.loadFriendDataSucceeded({ data: friends }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private client: HttpClient) { }
}
