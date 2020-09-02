import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {DayPlanComponent} from './components/day-plan/day-plan.component';
import {CalendarCellComponent} from './components/calendar/calendar-cell/calendar-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DayPlanComponent,
    CalendarCellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
