import { Component, Input } from '@angular/core';

import { StockResult } from './stock-result';

@Component({
  selector: 'app-results-log',
  template: `
    <h2>History</h2>
    <ul *ngFor="let result of results">
      <li>
        {{ result.symbol }}: \${{ result.lastTradePrice }} retrieved at {{ result.retrieved }}
      </li>
    </ul>
  `
})
export class ResultsLogComponent {
  // https://angular.io/docs/ts/latest/cookbook/component-communication.html

  private results: Array<StockResult> = [];

  @Input()
  set result(result: StockResult) {
    if (result) {
      this.results.push(result);
    }
  }
}
