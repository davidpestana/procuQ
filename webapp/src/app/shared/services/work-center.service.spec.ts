import { TestBed, inject } from '@angular/core/testing';

import { WorkCenterService } from './work-center.service';

describe('WorkCenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkCenterService]
    });
  });

  it('should be created', inject([WorkCenterService], (service: WorkCenterService) => {
    expect(service).toBeTruthy();
  }));
});
