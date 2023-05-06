import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FakePendingOrdersService } from './fake-pending-orders.service';

describe('FakePendingOrdersService', () => {
  let service: FakePendingOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FakePendingOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
