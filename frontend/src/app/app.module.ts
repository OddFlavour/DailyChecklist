import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {DayPlanComponent} from './components/day-plan/day-plan.component';
import {CalendarCellComponent} from './components/calendar/calendar-cell/calendar-cell.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AddEventButtonComponent} from './components/add-event-button/add-event-button.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DayPlanComponent,
    CalendarCellComponent,
    NavbarComponent,
    AddEventButtonComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
