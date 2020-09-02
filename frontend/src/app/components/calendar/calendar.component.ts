import {Component, OnInit} from '@angular/core';
import {CalendarCellModel} from '../../models/CalendarCellModel';
import {Month} from '../../models/Month';
import {CalendarService} from '../../services/calendar.service';
import {toDate} from '../../constants/HelperFunctions';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  readonly NUMBER_OF_CELLS = 42;

  weeksLoop = [0, 1, 2, 3, 4, 5];
  daysLoop = [0, 1, 2, 3, 4, 5, 6];

  calendarCells: CalendarCellModel[] = [];
  currMonth: Month;

  public get month(): typeof Month {
    return Month;
  }

  constructor(private cs: CalendarService) {
  }

  ngOnInit(): void {
    const today = new Date();

    /*
    Set the initial state for the calendar
     */

    // Month[{int}] will map the int to a string (enum name)
    // Month[{string}] will map the string to a Month
    this.currMonth = Month[Month[today.getMonth()]];
    this.cs.currDate = toDate(today.toISOString());

    // Perform offset calculation to determine what the first 'CalendarCellModel.ts' should show
    // The offset calculation: subtract whatever day of the week the 1st of the month is on from the 1st of the month
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    start.setDate(start.getDate() - start.getDay());

    for (let i = 0; i < this.NUMBER_OF_CELLS; i++) {
      this.calendarCells[i] = {
        date: toDate(start.toISOString()),
        year: start.getFullYear(),
        month: start.getMonth(),
        dMonth: start.getDate()
      };

      // Increment to next day
      start.setDate(start.getDate() + 1);
    }
  }

  /**
   * On click of a cell, parse the string. Then set that string as the 'currDate' in CalendarService.
   */
  onClickCell(w: number, d: number): void {
    const focus = this.calendarCells[d + (w * 7)];

    this.cs.currDate = focus.date;
  }
}
