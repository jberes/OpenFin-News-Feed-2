import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CompanyNewsDataService } from './company-news-data.service';

describe('CompanyNewsDataService', () => {
  let service: CompanyNewsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CompanyNewsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
