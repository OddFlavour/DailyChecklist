# DailyChecklist
Objective:
- To create a calendar-like web app that will have a checklist daily.
- This checklist's items will be added and removed by the user initially, then onwards from the day of creation/deletion, the checklist will/will not contain that entry automatically.

Technical Details:
- Frontend: AngularJS
- Backend: NodeJS, MongoDB?

# Terminology
`Day Plan` - the checklist

`Event` - an item on the day plan that's been added by the user

# Frontend
## General Overview
There will be one endpoint available, the root endpoint: `{base-url}/`

The page will contain a calendar (represented by `Calendar` component):
- 6 rows (showing days of the month)
- each row spans Sunday, Monday, ..., Saturday
- each of the days will be represented by a `DayCell` component
- the user can navigate between months (via prev/next buttons)
- each `DayCell` will be clickable and will update the day plan accordingly

It will also contain a day plan on the left:
- with events added by user
- upon initial launch, the default day plan will be today's date (timezone applied)
- the user can change the day plan by navigating to another date
- the events can be completed/incomplete
- user is also able to go back in time and change status of events
- HOWEVER, they cannot go forward in time to change the status (in order to implement this, future dates should not have events pre-populated)

It will also contain an Add Event button:
- clicking on this button will show a modal, where the user can specify:
    - title of event
    - start date
- upon success/failure, message is provided accordingly

## Components
### $ AppComponent
> Holds the CalendarComponent, AddEventButtonComponent, DayPlanComponent
### $ CalendarComponent
> Holds a list of `CalendarCellComponent`s, each representing a day in a month.
### $ CalendarCellComponent
> Holds a list of events to display in the cell.
>
> - Completed events will be highlighted in green
> - Incomplete events will be highlighted in gray
### $ AddEventButtonComponent
### $ DayPlanComponent