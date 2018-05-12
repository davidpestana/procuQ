import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCenterSelectorComponent } from './work-center-selector.component';

describe('WorkCenterSelectorComponent', () => {
  let component: WorkCenterSelectorComponent;
  let fixture: ComponentFixture<WorkCenterSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkCenterSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCenterSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
