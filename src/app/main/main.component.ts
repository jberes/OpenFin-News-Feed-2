import { Component, OnInit } from '@angular/core';
import { FinancialService } from '../services/financial.service';
import { CompanyNewsDataService } from '../services/company-news-data.service';
import { FinTech2500Service } from '../services/fin-tech2500.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public financialBoxOfficeRevenue: any = null;
  public companyNewsDataNewsFeed: any = null;
  public finTech2500Fins: any = null;

  constructor(
    private financialService: FinancialService,
    private companyNewsDataService: CompanyNewsDataService,
    private finTech2500Service: FinTech2500Service,
  ) {}

  ngOnInit() {
    // depending on implementation, data subscriptions might need to be unsubbed later
    this.financialService.getData('BoxOfficeRevenue').subscribe(data => this.financialBoxOfficeRevenue = data);
    this.companyNewsDataService.getNewsFeed().subscribe(data => this.companyNewsDataNewsFeed = data);
    this.finTech2500Service.getFins().subscribe(data => this.finTech2500Fins = data);
  }
}
