import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LidlFileEventsParserComponent } from './lidl-file-events-parser.component';

describe('LidlFileEventsParserComponent', () => {
  let component: LidlFileEventsParserComponent;
  let fixture: ComponentFixture<LidlFileEventsParserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LidlFileEventsParserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LidlFileEventsParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
