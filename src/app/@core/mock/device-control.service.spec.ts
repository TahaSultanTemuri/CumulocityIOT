import { TestBed } from '@angular/core/testing';

import { DeviceControlService } from './device-control.service';

describe('DeviceControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceControlService = TestBed.get(DeviceControlService);
    expect(service).toBeTruthy();
  });
});
