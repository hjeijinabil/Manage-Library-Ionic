import { TestBed } from '@angular/core/testing';

import { ManagementBookService } from './management-book.service';

describe('ManagementBookService', () => {
  let service: ManagementBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
