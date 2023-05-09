import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CompanyStockDataService } from '../services/company-stock-data.service';
import { CompanyNewsDataService } from '../services/company-news-data.service';
import { FinTech2500Service } from '../services/fin-tech2500.service';
import { GlobalService } from '../services/global-service.service';

declare let $: any;
$.ig.RevealSdkSettings.setBaseUrl("https://reveal-api.azurewebsites.net/");


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss',     
    '../../assets/dark-theme-financial-chart.css',
    '../../assets/dark-theme-tooltips.css',]
})
export class MainComponent implements OnInit, AfterViewInit {
  
  public fakeStockDataStockData: any = null;
  public companyNewsDataNewsFeed: any = null;
  public fakePendingOrdersPendingOrders: any = null;
  public finTech2500Fins: any = null;

  private originalCompanyNewsDataNewsFeed: any = null;
  public dataArray: any = null;
  public labelValue: string = '';
  globalTicker: string = '';


  dataSource: any[] = [];
  
  // Company Data
  originalStockSymbolData: any[] = [];
  filteredStockSymbolData: any[] = [];
  // News Data
  originalNewsData: any[] = [];
  filteredNewsData: any[] = [];

  selectedItem: any;
  prevSelectedItem: any;
  searchText: string = "";

  constructor(
    private companyNewsDataService: CompanyNewsDataService,
    private finTech2500Service: FinTech2500Service,
    private companyStockDataService: CompanyStockDataService,
    private cdRef: ChangeDetectorRef,
    private globalService: GlobalService,
  ) {
    this.globalTicker = this.globalService.globalTicker;
    this.globalService.initInterApp();
  }
  
  @ViewChild('revealView') el!: ElementRef;

   ngAfterViewInit() {
    this.loadDashboard("Sector Analysis");
    };

    async loadDashboard(dashboardId: string, stockSymbol?: string) {
      const dashboard = await $.ig.RVDashboard.loadDashboard(dashboardId);
      const revealView = new $.ig.RevealView(this.el.nativeElement);
      revealView.dashboard = dashboard;
      revealView.singleVisualizationMode=true;
      revealView.showMenu=false;
      revealView.showHeader=false;
      revealView.maximizedVisualization = dashboard.visualizations.getByTitle('Sectors');
      this.cdRef.detectChanges();
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


    this.companyNewsDataService.getNewsFeed().subscribe({
      next: data => {
        this.filteredNewsData = this.originalNewsData = data;
        let firstItem = this.originalNewsData[0];
        console.log("firstItem", firstItem);
        //this.UpdateNewsFeed(firstItem);
      },
      error: error => {
        console.error('Error occurred while fetching company feed:', error);
      }
    })

    this.globalService.dataArray.subscribe(data => {
      if (data && data.length > 0 && data[0].id && data[0].id.ticker) {
        this.labelValue = data[0].id.ticker;
        this.globalService.globalTicker = data[0].id.ticker
        this.globalTicker = this.globalService.globalTicker;
        this.UpdateChart(data[0].id.ticker);
      }
    });

    this.finTech2500Service.getFins().subscribe(data => this.finTech2500Fins = data);
  }

  onItemClicked(item: any) {
    this.selectedItem = item;
    if (this.prevSelectedItem) {
      this.prevSelectedItem.selected = false;
    }
    item.selected = true;
    this.prevSelectedItem = item;
  }

  UpdateChart(stockItem: any) {
    if (this.globalTicker) {
      this.filteredStockSymbolData = this.originalStockSymbolData.filter(item => item['stock_symbol'].startsWith(this.globalTicker.toUpperCase()));
      this.companyNewsDataNewsFeed = this.originalNewsData.filter(item => item['Ticker'].startsWith(this.globalTicker.toUpperCase()));
      stockItem = this.filteredStockSymbolData[0];
      this.onItemClicked(stockItem);
    } else {
      this.filteredStockSymbolData = this.originalStockSymbolData;
      this.companyNewsDataNewsFeed = this.originalNewsData;
    }

    const { company_name: company, stock_symbol: symbol, avg_volume: volume, previous_close: price } = stockItem;
    const stockPriceDataItems = this.companyStockDataService.GenerateStockPriceData(price, volume);
    const title = `${company} (${symbol})`;
    (stockPriceDataItems as any).__dataIntents = { close: [`SeriesTitle/${title}`] };
    this.dataSource = stockPriceDataItems;
    this.cdRef.detectChanges();
  }

  public formatNumber(value: number) {
    return value.toFixed(2);
}
}
