import { TestBed } from '@angular/core/testing';

import { VideoRequestService } from './video-request.service';

describe('VideoRequestService', () => {
  let service: VideoRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
