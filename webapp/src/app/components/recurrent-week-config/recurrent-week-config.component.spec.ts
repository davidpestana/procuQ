import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrentWeekConfigComponent } from './recurrent-week-config.component';

describe('RecurrentWeekConfigComponent', () => {
  let component: RecurrentWeekConfigComponent;
  let fixture: ComponentFixture<RecurrentWeekConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrentWeekConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrentWeekConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
