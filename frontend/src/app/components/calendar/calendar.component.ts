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

  public get month(): typeof Month {
    return Month;
  }

  constructor(public cs: CalendarService) {
  }

  ngOnInit(): void {
    // Set up subscription
    this.cs.currMonthUpdated$.subscribe(value => {
      this.updateCalendar(new Date(this.cs.currYear, this.cs.currMonth));
    });

    this.cs.eventsUpdated$.subscribe(value => {
      this.updateCalendar(new Date(this.cs.currYear, this.cs.currMonth));
    });

    const today = new Date();

    /*
    Set the initial state for the calendar
     */
    // Month[{int}] will map the int to a string (enum name)
    // Month[{string}] will map the string to a Month
    this.cs.currYear = today.getFullYear();
    this.cs.currMonth = Month[Month[today.getMonth()]];
    this.cs.currDate = toDate(today);
  }

  /**
   * On click of a cell, parse the string. Then set that string as the 'currDate' in CalendarService.
   */
  onClickCell(w: number, d: number): void {
    const focus = this.calendarCells[d + (w * 7)];

    this.cs.currDate = focus.date;
  }

  /**
   * On click of Home, return calendar state to today's month and year
   */
  onClickHome(): void {
    const today = new Date();

    this.cs.currYear = today.getFullYear();
    this.cs.currMonth = Month[Month[today.getMonth()]];
  }

  /**
   * On click of navigation buttons, increment/decrement the month
   * @param direction +1/-1/0
   */
  navigateMonth(direction: number): void {
    // Failsafe for misuse when 'direction not +1/-1/0'
    if (Math.abs(direction) > 1) {
      return;
    }

    const date = new Date(this.cs.currYear, this.cs.currMonth);
    date.setMonth(date.getMonth() + direction);

    this.cs.currYear = date.getFullYear();
    this.cs.currMonth = Month[Month[date.getMonth()]];
  }

  private updateCalendar(currDate: Date): void {
    // Perform offset calculation to determine what the first 'CalendarCellModel.ts' should show
    // The offset calculation: subtract whatever day of the week the 1st of the month is on from the 1st of the month
    const start = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
    start.setDate(start.getDate() - start.getDay());

    for (let i = 0; i < this.NUMBER_OF_CELLS; i++) {
      this.calendarCells[i] = {
        date: toDate(start),
        year: start.getFullYear(),
        month: start.getMonth(),
        dMonth: start.getDate()
      };

      // Increment to next day
      start.setDate(start.getDate() + 1);
    }

    this.cs.getEvents(this.calendarCells[0].date, this.calendarCells[this.calendarCells.length - 1].date, false);
  }
}
