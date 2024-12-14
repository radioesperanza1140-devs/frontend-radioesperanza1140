import { TestBed } from '@angular/core/testing';

import { ProgramationsListService } from './programations-list.service';

describe('ProgramationsListService', () => {
  let service: ProgramationsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramationsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
