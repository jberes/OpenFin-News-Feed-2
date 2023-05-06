import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { ErrorRoutingModule } from './error-routing/error-routing.module';
import { TraderAppV2Component } from './trader-app-v2/trader-app-v2.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  { path: '', redirectTo: 'trader-app-v2', pathMatch: 'full' },
  { path: 'error', component: UncaughtErrorComponent },
  { path: '', redirectTo: 'trader-app-v2', pathMatch: 'full' }, { path: 'trader-app-v2', component: TraderAppV2Component, data: { text: 'trader-app-v2' } },
  { path: 'main', component: MainComponent, data: { text: 'Main' } },
  { path: '**', component: PageNotFoundComponent } // must always be last
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ErrorRoutingModule],
  exports: [RouterModule, ErrorRoutingModule]
})
export class AppRoutingModule {
}
