import {Injectable} from '@angular/core';
import {EventModel} from '../models/EventModel';
import {Subject} from 'rxjs';
import {Month} from '../models/Month';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private pCurrDate: string;
  private pCurrMonth: Month;

  currYear: number;

  get currDate(): string {
    return this.pCurrDate;
  }

  set currDate(newDate: string) {
    this.pCurrDate = newDate;

    // Notify subscribers
    this.currDateUpdatedSource.next();
  }

  get currMonth(): Month {
    return this.pCurrMonth;
  }

  set currMonth(newMonth: Month) {
    this.pCurrMonth = newMonth;

    // Notify subscribers
    this.currMonthUpdatedSource.next();
  }

  private events: {} = {
    '2020-09-02': [
      {date: '2020-09-02', desc: 'Test', isComplete: false},
      {date: '2020-09-02', desc: 'Test', isComplete: true},
      {date: '2020-09-02', desc: 'Test', isComplete: false},
      {date: '2020-09-02', desc: 'Test', isComplete: false},
      {date: '2020-09-02', desc: 'Test', isComplete: false}
    ],
    '2020-07-23': [
      {date: '2020-07-23', desc: 'Longer name test for fun', isComplete: false},
      {date: '2020-07-23', desc: 'Longer name test for fun', isComplete: false},
      {date: '2020-07-23', desc: 'Longer name test for fun', isComplete: false}
    ]
  };

  /*
  [START] Observable List
   */
  // Observable source
  private currDateUpdatedSource = new Subject();
  // Observable
  currDateUpdated$ = this.currDateUpdatedSource.asObservable();

  private currMonthUpdatedSource = new Subject();
  currMonthUpdated$ = this.currMonthUpdatedSource.asObservable();

  private eventsUpdatedSource = new Subject();
  eventsUpdated$ = this.eventsUpdatedSource.asObservable();

  /*
  [END] Observable List
   */

  constructor() {
  }

  getEventsOnDate(date: string): EventModel[] {
    // TODO(jackson): If 'this.events[date]' is null, then fetch from backend server
    return this.events[date] ?? [];
  }

  addNewEvent(formValue: EventModel): void {
    formValue.isComplete = false;

    if (!this.events[formValue.date]) {
      this.events[formValue.date] = [];
    }

    (this.events[formValue.date] as EventModel[]).push(formValue);

    this.eventsUpdatedSource.next();
  }
}
