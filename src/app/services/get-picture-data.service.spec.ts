import { TestBed } from '@angular/core/testing';

import { GetPictureDataService } from './get-picture-data.service';

describe('GetPictureDataService', () => {
  let service: GetPictureDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPictureDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
