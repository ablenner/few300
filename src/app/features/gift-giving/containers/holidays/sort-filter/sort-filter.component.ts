import { Component, OnInit, Input } from '@angular/core';
import { GiftGivingState } from '../../../reducers';
import { Store } from '@ngrx/store';
import * as actions from '../../../actions/sort-filter.actions';

@Component({
  selector: 'app-sort-filter',
  templateUrl: './sort-filter.component.html',
  styleUrls: ['./sort-filter.component.css']
})
export class SortFilterComponent implements OnInit {

  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
  }

  viewAll() {
    this.store.dispatch(actions.filterShowAll());
  }

  showOnlyUpcoming() {
    this.store.dispatch(actions.filterShowOnlyUpcoming());
  }
}
