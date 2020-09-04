import { Injectable } from '@angular/core';
import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

/**
 * Custom adapter for Datepicker, in order to transform form value into correct format (yyyy-mm-dd)
 */
@Injectable()
export class CustomDatepickerAdapterService extends NgbDateAdapter<string> {

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split('-');
      return {
        year: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        day: parseInt(date[2], 10)
      };
    }

    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? `${date.year}-${('0' + date.month).slice(-2)}-${('0' + date.day).slice(-2)}` : null;
  }
}
