import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CompanyStockDataService } from '../services/company-stock-data.service';
import { FakeStockDataService } from '../services/fake-stock-data.service';
import { FakePendingOrdersService } from '../services/fake-pending-orders.service';
import { CompanyNewsDataService } from '../services/company-news-data.service';
import { FinTech2500Service } from '../services/fin-tech2500.service';
import { GlobalService } from '../services/global-service.service';

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

  private originalCompanyNewsDataNewsFeed: any = null;
  public dataArray: any = null;
  public labelValue: string = '';
  globalTicker: string = '';


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
    private cdRef: ChangeDetectorRef,
    private globalService: GlobalService,
  ) {
    this.globalTicker = this.globalService.globalTicker;
    this.globalService.initInterApp();
  }

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

    this.globalService.dataArray.subscribe(data => {
      this.labelValue = data[0].id.ticker;
      this.globalService.globalTicker = data[0].id.ticker
      this.globalTicker = this.globalService.globalTicker;
      //this.filterNewsFeed();
      this.cdRef.detectChanges();
    });

    // this should all go away for the most part
    //this.fakeStockDataService.getStockData().subscribe(data => this.fakeStockDataStockData = data);
    //this.companyNewsDataService.getNewsFeed().subscribe(data => this.companyNewsDataNewsFeed = data);
    //this.fakePendingOrdersService.getPendingOrders().subscribe(data => this.fakePendingOrdersPendingOrders = data);
    //this.finTech2500Service.getFins().subscribe(data => this.finTech2500Fins = data);
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


  private filterNewsFeed(): void {
    console.log("I am in the News Feed") + this.globalTicker;
   // if (this.companyNewsDataNewsFeed && this.dataArray && this.dataArray.length > 0) {
   if (this.globalTicker) {
    console.log("I am in the If: " + this.globalTicker);
    //this.companyNewsDataNewsFeed = this.originalCompanyNewsDataNewsFeed.filter(item => this.globalTicker);
       console.log("Original News Feed: " + this.originalCompanyNewsDataNewsFeed);
       console.log("Company News Feed: " + this.companyNewsDataNewsFeed);  
       if (this.globalService.globalFeed !== null) {
        this.companyNewsDataNewsFeed = this.globalService.globalFeed
      } else {
        
        this.companyNewsDataNewsFeed = this.originalCompanyNewsDataNewsFeed.filter(item => item.Ticker && item.Ticker === this.globalTicker);
      }
    //this.companyNewsDataNewsFeed = this.originalCompanyNewsDataNewsFeed.filter(item => item.Ticker && item.Ticker === this.globalTicker);
    //this.globalService.globalFeed = this.companyNewsDataNewsFeed;
    console.log("Global Feed: " + this.globalService.globalFeed);
    //stockItem = this.filteredStockSymbolData[0];
  } else {
    //this.companyNewsDataNewsFeed = this.originalCompanyNewsDataNewsFeed.filter(item => item.Ticker && item.Ticker === this.globalTicker);
    //this.companyNewsDataNewsFeed = this.originalCompanyNewsDataNewsFeed;
  }


      
      const ticker = this.globalTicker; //this.dataArray[0].id.default;
      console.log("Global Ticker: " + this.globalTicker);
      console.log("I set the Ticker: " + ticker); 
  }

  public formatNumber(value: number) {
    return value.toFixed(2);
}
}
