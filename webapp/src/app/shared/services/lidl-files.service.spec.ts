import { TestBed, inject } from '@angular/core/testing';

import { LidlFilesService } from './lidl-files.service';

describe('LidlFilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LidlFilesService]
    });
  });

  it('should be created', inject([LidlFilesService], (service: LidlFilesService) => {
    expect(service).toBeTruthy();
  }));
});
