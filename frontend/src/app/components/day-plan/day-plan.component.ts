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

  onClickLabel(e: EventModel): void {
    // We don't want to alter the actual object, so creating a clone and manipulating it instead
    const clone = JSON.parse(JSON.stringify(e));
    clone.isComplete = !clone.isComplete;

    this.cs.updateEventStatus(clone);
  }
}
