import { createAction, props } from '@ngrx/store';
import { FriendEntity } from '../reducers/friends.reducer';

let currentId = 1;

export const friendAdded = createAction(
  '[gift giving] friend added',
  ({ name }: { name: string }) => ({
    entity: {
      id: 'T' + currentId++,
      name
    } as FriendEntity
  })
);


export const friendAddedSuccess = createAction(
  '[gift giving] friend added success',
  props<{ oldId: string, newEntity: FriendEntity }>()
);

export const friendAddedFailure = createAction(
  '[gift giving] friend added failure',
  props<{ message: string, entity: FriendEntity }>()
);

export const loadFriendData = createAction(
  '[gift giving] load friend data'
);

export const loadFriendDataSucceeded = createAction(
  '[gift giving] load friend data succeeded',
  props<{ data: FriendEntity[] }>()
);

export const loadFriendDataFailed = createAction(
  '[gift giving] load friend data failed',
  props<{ message: string }>()
);
