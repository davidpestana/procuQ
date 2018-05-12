import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerManagerComponent } from './worker-manager.component';

describe('WorkerManagerComponent', () => {
  let component: WorkerManagerComponent;
  let fixture: ComponentFixture<WorkerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
