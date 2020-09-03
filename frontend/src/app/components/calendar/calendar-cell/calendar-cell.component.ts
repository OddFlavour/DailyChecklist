import {Component, Input, OnInit} from '@angular/core';
import {CalendarCellModel} from '../../../models/CalendarCellModel';
import {EventModel} from '../../../models/EventModel';
import {CalendarService} from '../../../services/calendar.service';

@Component({
  selector: 'app-calendar-cell',
  templateUrl: './calendar-cell.component.html',
  styleUrls: ['./calendar-cell.component.css']
})
export class CalendarCellComponent implements OnInit {

  readonly MAX_ROWS = 3;

  @Input() cell: CalendarCellModel;

  events: EventModel[] = [];

  constructor(public cs: CalendarService) {
  }

  ngOnInit(): void {
    // Attach as an subscriber
    this.cs.currMonthUpdated$.subscribe(value => {
      // Set timeout to delay until next event loop
      setTimeout(() => this.events = this.cs.getEventsOnDate(this.cell.date), 0);
    });

    // Initial value set, future updates will be handled by the subscription
    this.events = this.cs.getEventsOnDate(this.cell.date);
  }

  getEventLabels(): { text: string, isComplete: boolean }[] {
    const labels: { text: string, isComplete: boolean }[] = [];

    // Only allow max of 3 labels to display
    for (let i = 0; i < Math.min(this.MAX_ROWS, this.events.length); i++) {
      labels.push({
        text: this.events[i].desc,
        isComplete: this.events[i].isComplete
      });
    }

    // If there are more than 3 labels, then the last third label will indicate how many more there are
    if (this.events.length > this.MAX_ROWS) {
      const offset = this.events.length - this.MAX_ROWS + 1;

      labels[this.MAX_ROWS - 1] = {text: ` and ${offset} more`, isComplete: false};
    }

    return labels;
  }
}
