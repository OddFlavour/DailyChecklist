import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayPlanComponent } from './day-plan.component';

describe('DayPlanComponent', () => {
  let component: DayPlanComponent;
  let fixture: ComponentFixture<DayPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
