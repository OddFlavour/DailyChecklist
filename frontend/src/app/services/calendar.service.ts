import { Injectable } from '@angular/core';
import {EventModel} from '../models/EventModel';
import {Observable, Subject} from 'rxjs';

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

    this.currDateUpdatedSource.next();
  }

  private events: {} = {
    '2020-09-02': [
      { date: '2020-09-02', desc: 'Test', isComplete: false },
      { date: '2020-09-02', desc: 'Test', isComplete: false },
      { date: '2020-09-02', desc: 'Test', isComplete: false },
      { date: '2020-09-02', desc: 'Test', isComplete: false },
      { date: '2020-09-02', desc: 'Test', isComplete: false }
    ]
  };

  // Observable source
  private currDateUpdatedSource = new Subject();
  // Observable
  currDateUpdated$ = this.currDateUpdatedSource.asObservable();

  constructor() { }

  getEventsOnDate(date: string): EventModel[] {
    // TODO(jackson): If 'this.events[date]' is null, then fetch from backend server
    return this.events[date] ?? [];
  }
}
