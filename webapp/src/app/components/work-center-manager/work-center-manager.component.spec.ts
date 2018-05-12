import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCenterManagerComponent } from './work-center-manager.component';

describe('WorkCenterManagerComponent', () => {
  let component: WorkCenterManagerComponent;
  let fixture: ComponentFixture<WorkCenterManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkCenterManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCenterManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
