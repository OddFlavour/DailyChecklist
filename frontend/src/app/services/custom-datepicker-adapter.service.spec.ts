import { TestBed } from '@angular/core/testing';

import { CustomDatepickerAdapterService } from './custom-datepicker-adapter.service';

describe('CustomDatepickerAdapterService', () => {
  let service: CustomDatepickerAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomDatepickerAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
