import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FinTech2500Service } from './fin-tech2500.service';

describe('FinTech2500Service', () => {
  let service: FinTech2500Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FinTech2500Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
