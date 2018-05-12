import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerSelectorComponent } from './worker-selector.component';

describe('WorkerSelectorComponent', () => {
  let component: WorkerSelectorComponent;
  let fixture: ComponentFixture<WorkerSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
