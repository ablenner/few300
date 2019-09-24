import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftGivingComponent } from './gift-giving.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { HolidaysComponent } from './containers/holidays/holidays.component';
import { FriendsComponent } from './containers/friends/friends.component';
import { StoreModule } from '@ngrx/store';
import { reducers, featureName } from './reducers';
import { ListComponent } from './containers/holidays/list/list.component';
import { EntryComponent } from './containers/holidays/entry/entry.component';
import { SortFilterComponent } from './containers/holidays/sort-filter/sort-filter.component';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './effects/app.effects';
import { SortFilterEffects } from './effects/sort-filter.effects';
import { HttpClientModule } from '@angular/common/http';
import { HolidaysEffects } from './effects/holidays.effects';
import { FriendListComponent } from './containers/friends/friend-list/friend-list.component';
import { FriendEntryComponent } from './containers/friends/friend-entry/friend-entry.component';
import { FriendsEffects } from './effects/friends.effects';

const routes: Routes = [
  {
    path: 'gifts',
    component: GiftGivingComponent,
    children: [
      {
        path: 'holidays',
        component: HolidaysComponent
      },
      {
        path: 'friends',
        component: FriendsComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];

@NgModule({
  declarations: [
    GiftGivingComponent,
    DashboardComponent,
    HolidaysComponent,
    FriendsComponent,
    ListComponent,
    EntryComponent,
    SortFilterComponent,
    FriendListComponent,
    FriendEntryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([
      AppEffects,
      SortFilterEffects,
      HolidaysEffects,
      FriendsEffects]),
    HttpClientModule
  ]
})
export class GiftGivingModule { }
