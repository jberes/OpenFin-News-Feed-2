import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyStockDataService } from '../services/company-stock-data.service';
import { FakeStockDataService } from '../services/fake-stock-data.service';
import { FakePendingOrdersService } from '../services/fake-pending-orders.service';
import { CompanyNewsDataService } from '../services/company-news-data.service';
import { FinTech2500Service } from '../services/fin-tech2500.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss',     
    '../../assets/dark-theme-financial-chart.css',
    '../../assets/dark-theme-tooltips.css',]
})
export class MainComponent implements OnInit {

  public fakeStockDataStockData: any = null;
  public companyNewsDataNewsFeed: any = null;
  public fakePendingOrdersPendingOrders: any = null;
  public finTech2500Fins: any = null;


  dataSource: any[] = [];
  originalStockSymbolData: any[] = [];
  filteredStockSymbolData: any[] = [];
  selectedItem: any;
  prevSelectedItem: any;
  searchText: string = "";

  constructor(
    private fakeStockDataService: FakeStockDataService,
    private companyNewsDataService: CompanyNewsDataService,
    private fakePendingOrdersService: FakePendingOrdersService,
    private finTech2500Service: FinTech2500Service,
    private companyStockDataService: CompanyStockDataService,
  ) {}

  ngOnInit() {
    
    this.companyStockDataService.getCompanyFeed().subscribe({
      next: data => {
        this.filteredStockSymbolData = this.originalStockSymbolData = data;
        let firstItem = this.originalStockSymbolData[0];
        this.onItemClicked(firstItem);
        this.UpdateChart(firstItem);
      },
      error: error => {
        console.error('Error occurred while fetching company feed:', error);
      }
    })

    // this should all go away for the most part
    //this.fakeStockDataService.getStockData().subscribe(data => this.fakeStockDataStockData = data);
    this.companyNewsDataService.getNewsFeed().subscribe(data => this.companyNewsDataNewsFeed = data);
    this.fakePendingOrdersService.getPendingOrders().subscribe(data => this.fakePendingOrdersPendingOrders = data);
    this.finTech2500Service.getFins().subscribe(data => this.finTech2500Fins = data);
  }

  onItemClicked(item: any) {
    this.selectedItem = item;
    this.UpdateChart(item)

    if (this.prevSelectedItem) {
      this.prevSelectedItem.selected = false;
    }

    item.selected = true;
    this.prevSelectedItem = item;
  }

  UpdateChart(stockItem: any) {
    console.log('Updating chart with:', stockItem);
    const { company_name: company, stock_symbol: symbol, avg_volume: volume, previous_close: price } = stockItem;
    console.log('Updating chart with:', stockItem);
    console.log("Price: " + price);
    console.log("Volume: " + volume);
    const stockPriceDataItems = this.companyStockDataService.GenerateStockPriceData(price, volume);
    const title = `${company} (${symbol})`;
    (stockPriceDataItems as any).__dataIntents = { close: [`SeriesTitle/${title}`] };
    this.dataSource = stockPriceDataItems;
  }

  public formatNumber(value: number) {
    return value.toFixed(2);
}
}
