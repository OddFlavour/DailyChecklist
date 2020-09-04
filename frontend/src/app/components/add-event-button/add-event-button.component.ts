import {Component, OnInit} from '@angular/core';
import {NgbDate, NgbDateAdapter, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {CalendarService} from '../../services/calendar.service';
import {CustomDatepickerAdapterService} from '../../services/custom-datepicker-adapter.service';

@Component({
  selector: 'app-add-event-button',
  templateUrl: './add-event-button.component.html',
  styleUrls: ['./add-event-button.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: CustomDatepickerAdapterService}]
})
export class AddEventButtonComponent implements OnInit {

  form: FormGroup = new FormGroup({
    desc: new FormControl('', Validators.required),

    // The default date adapter will be overridden through the provider given in AppModule providers
    date: new FormControl('', [Validators.required, Validators.pattern('\\d{4}-\\d{2}-\\d{2}')])
  });

  constructor(private modalService: NgbModal, private cs: CalendarService) {
  }

  ngOnInit(): void {
  }

  open(content): void {
    this.form.reset();
    this.modalService.open(content, {backdrop: 'static'});
  }

  onSave(): number {
    if (this.form.valid) {
      this.cs.addNewEvent(this.form.value);

      return 1;
    }

    return 0;
  }

  isInvalidDate(date: NgbDate, current: {month: number}): boolean {
    const today = new Date();

    return date.after({year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()});
  }
}
