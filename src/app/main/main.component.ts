import { Component, OnInit } from '@angular/core';
import { FakeStockDataService } from '../services/fake-stock-data.service';
import { FakePendingOrdersService } from '../services/fake-pending-orders.service';
import { CompanyNewsDataService } from '../services/company-news-data.service';
import { FinTech2500Service } from '../services/fin-tech2500.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public fakeStockDataStockData: any = null;
  public companyNewsDataNewsFeed: any = null;
  public fakePendingOrdersPendingOrders: any = null;
  public finTech2500Fins: any = null;

  constructor(
    private fakeStockDataService: FakeStockDataService,
    private companyNewsDataService: CompanyNewsDataService,
    private fakePendingOrdersService: FakePendingOrdersService,
    private finTech2500Service: FinTech2500Service,
  ) {}

  ngOnInit() {
    // depending on implementation, data subscriptions might need to be unsubbed later
    this.fakeStockDataService.getStockData().subscribe(data => this.fakeStockDataStockData = data);
    this.companyNewsDataService.getNewsFeed().subscribe(data => this.companyNewsDataNewsFeed = data);
    this.fakePendingOrdersService.getPendingOrders().subscribe(data => this.fakePendingOrdersPendingOrders = data);
    this.finTech2500Service.getFins().subscribe(data => this.finTech2500Fins = data);
  }
}
