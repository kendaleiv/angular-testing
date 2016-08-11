import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { CurrentResultsComponent } from './current-results.component';
import { ResultsLogComponent } from './results-log.component';
import { StockResult } from './stock-result';
import { StockRetrieverService } from './stock-retriever.service';

// TODO: Move directives into module declarations:
// https://angular.io/docs/ts/latest/cookbook/rc4-to-rc5.html#!#5-cleanup
// Leaving them as-is for now.

@Component({
  directives: [
    CurrentResultsComponent,
    ResultsLogComponent
  ],
  providers: [
    StockRetrieverService
  ],
  selector: 'app-root',
  template: `
    <label for="stock-symbol">Stock Symbol:</label>
    <input type="text" id="stock-symbol" [(ngModel)]="symbol" />
    <button id="fetch" (click)="fetch()">Fetch</button>

    <current-results [result]="currentResult | async"></current-results>
    <results-log [result]="currentResult | async"></results-log>
  `
  // For debugging currentResult:
  // <hr />
  // <div>{{ (currentResult | async)?.symbol }}</div>
})
export class AppComponent implements OnInit {
  currentResult: Observable<StockResult>;
  symbol: string;

  constructor(private stockRetrieverService: StockRetrieverService) {
  }

  ngOnInit() {
    this.symbol = 'MSFT';
  }

  fetch() {
    this.currentResult = this.symbol
      ? this.stockRetrieverService.fetch(this.symbol)
      : null;

    // For debugging usage of this.currentResult:
    //
    // this.stockRetrieverService
    //   .fetch(this.symbol)
    //   .subscribe(
    //     (result: StockResult) => { console.log(result); },
    //     (error: any) => { console.error(error); });
  }
}
