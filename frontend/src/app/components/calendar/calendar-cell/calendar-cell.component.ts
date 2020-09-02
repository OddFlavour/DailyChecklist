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

  constructor(public cs: CalendarService) { }

  ngOnInit(): void {
    console.log('attached');
    this.cs.currMonthUpdated$.subscribe(value => {
      setTimeout(() => this.events = this.cs.getEventsOnDate(this.cell.date), 0);
    });
  }

  getEventLabels(): string[] {
    const labels: string[] = [];

    // Only allow max of 3 labels to display
    for (let i = 0; i < Math.min(this.MAX_ROWS, this.events.length); i++) {
      labels.push(this.events[i].desc);
    }

    // If there are more than 3 labels, then the last third label will indicate how many more there are
    if (this.events.length > this.MAX_ROWS) {
      const offset = this.events.length - this.MAX_ROWS + 1;

      labels[this.MAX_ROWS - 1] = ` and ${offset} more`;
    }

    return labels;
  }
}
