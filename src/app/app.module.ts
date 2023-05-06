import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TraderAppV2Component } from './trader-app-v2/trader-app-v2.component';
import { IgxNavigationDrawerModule, IgxIconModule, IgxTabsModule, IgxGridModule, IgxActionStripModule } from 'igniteui-angular';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { IgxCategoryChartModule } from 'igniteui-angular-charts';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TraderAppV2Component,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HammerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IgxNavigationDrawerModule,
    IgxIconModule,
    FormsModule,
    IgxTabsModule,
    IgxCategoryChartModule,
    IgxGridModule,
    IgxActionStripModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
