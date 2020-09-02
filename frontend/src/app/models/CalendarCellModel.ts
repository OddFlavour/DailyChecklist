export interface CalendarCellModel {
  date: string;
  year: number;

  /**
   * Index starts at 0
   */
  month: number;

  /**
   * Index starts at 1
   */
  dMonth: number;
}
