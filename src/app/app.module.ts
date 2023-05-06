import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { IgxTabsModule, IgxIconModule, IgxGridModule, IgxActionStripModule } from 'igniteui-angular';
import { IgxCategoryChartModule, IgxFinancialChartModule, IgxTreemapModule } from 'igniteui-angular-charts';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HammerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IgxTabsModule,
    IgxIconModule,
    IgxCategoryChartModule,
    IgxGridModule,
    IgxActionStripModule,
    IgxFinancialChartModule,
    IgxTreemapModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
