import {Injectable} from '@angular/core';
import {EventModel} from '../models/EventModel';
import {Subject} from 'rxjs';
import {Month} from '../models/Month';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private lastStart: string;
  private lastEnd: string;

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
    // Test data, uncomment if needed
    // '2020-09-02': [
    //   {_id: '2020-09-02', date: '2020-09-02', desc: 'Test', isComplete: false},
    //   {_id: '2020-09-02', date: '2020-09-02', desc: 'Test', isComplete: true},
    //   {_id: '2020-09-02', date: '2020-09-02', desc: 'Test', isComplete: false},
    //   {_id: '2020-09-02', date: '2020-09-02', desc: 'Test', isComplete: false},
    //   {_id: '2020-09-02', date: '2020-09-02', desc: 'Test', isComplete: false}
    // ],
    // '2020-07-23': [
    //   {_id: '2020-07-23', date: '2020-07-23', desc: 'Longer name test for fun', isComplete: false},
    //   {_id: '2020-07-23', date: '2020-07-23', desc: 'Longer name test for fun', isComplete: false},
    //   {_id: '2020-07-23', date: '2020-07-23', desc: 'Longer name test for fun', isComplete: false}
    // ]
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

  constructor(private api: ApiService) {
  }

  getEvents(start: string, end: string, force: boolean): void {
    // In the case that we have just updated, do not update again
    if (!force && start === this.lastStart && end === this.lastEnd) {
      return;
    }

    // Remember for future reference when current list of events have to be updated
    this.lastStart = start;
    this.lastEnd = end;

    this.api.getEvents(start, end).subscribe(value => {
      this.events = {
        ...this.events,
        ...value
      };

      this.eventsUpdatedSource.next();
    });
  }

  getEventsOnDate(date: string): EventModel[] {
    // TODO(jackson): If 'this.events[date]' is null, then fetch from backend server
    return this.events[date] ?? [];
  }

  addNewEvent(formValue: EventModel): void {
    this.api.postEvents(formValue).subscribe(_ => {
      this.getEvents(this.lastStart, this.lastEnd, true);
    });
  }

  updateEventStatus(e: EventModel): void {
    this.api.postEventsById(e).subscribe(
      _ => {
        // Upon success
        this.events[e.date].find(x => x._id === e._id).isComplete = e.isComplete;

        this.eventsUpdatedSource.next();
      },
      err => {
        console.log(err);
      });
  }
}
