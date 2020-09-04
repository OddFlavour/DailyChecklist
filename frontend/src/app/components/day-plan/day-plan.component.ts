import { Component, OnInit } from '@angular/core';
import {CalendarService} from '../../services/calendar.service';
import {EventModel} from '../../models/EventModel';

@Component({
  selector: 'app-day-plan',
  templateUrl: './day-plan.component.html',
  styleUrls: ['./day-plan.component.css']
})
export class DayPlanComponent implements OnInit {

  events: EventModel[];

  constructor(public cs: CalendarService) { }

  ngOnInit(): void {
    // Set observer to dynamically update 'events'
    this.cs.currDateUpdated$.subscribe(value => {
      this.events = this.cs.getEventsOnDate(this.cs.currDate);
    });

    this.cs.eventsUpdated$.subscribe(value => {
      this.events = this.cs.getEventsOnDate(this.cs.currDate);
    });
  }

}
