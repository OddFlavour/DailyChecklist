import { Injectable } from '@angular/core';
import {EventModel} from '../models/EventModel';
import {Subject} from 'rxjs';
import {Month} from '../models/Month';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private pCurrDate: string;
  get currDate(): string {
    return this.pCurrDate;
  }
  set currDate(newDate: string) {
    this.pCurrDate = newDate;

    // Notify subscribers
    this.currDateUpdatedSource.next();
  }

  private pCurrMonth: Month;
  get currMonth(): Month {
    return this.pCurrMonth;
  }
  set currMonth(newMonth: Month) {
    this.pCurrMonth = newMonth;

    // Notify subscribers
    this.currMonthUpdatedSource.next();
  }

  currYear: number;

  private events: {} = {
    '2020-09-02': [
      { date: '2020-09-02', desc: 'Test', isComplete: false },
      { date: '2020-09-02', desc: 'Test', isComplete: true },
      { date: '2020-09-02', desc: 'Test', isComplete: false },
      { date: '2020-09-02', desc: 'Test', isComplete: false },
      { date: '2020-09-02', desc: 'Test', isComplete: false }
    ],
    '2020-07-23': [
      { date: '2020-07-23', desc: 'Longer name test for fun', isComplete: false },
      { date: '2020-07-23', desc: 'Longer name test for fun', isComplete: false },
      { date: '2020-07-23', desc: 'Longer name test for fun', isComplete: false }
    ]
  };

  // Observable source
  private currDateUpdatedSource = new Subject();
  // Observable
  currDateUpdated$ = this.currDateUpdatedSource.asObservable();

  private currMonthUpdatedSource = new Subject();
  currMonthUpdated$ = this.currMonthUpdatedSource.asObservable();

  constructor() { }

  getEventsOnDate(date: string): EventModel[] {
    // TODO(jackson): If 'this.events[date]' is null, then fetch from backend server
    return this.events[date] ?? [];
  }
}
