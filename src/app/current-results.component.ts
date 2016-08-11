import { Component, Input } from '@angular/core';

import { StockResult } from './stock-result';

@Component({
  selector: 'current-results',
  template: `
    <h2>Current</h2>
    <div *ngIf="result">
      {{ result.symbol }}: \${{ result.lastTradePrice }} retrieved at {{ result.retrieved }}
    </div>
  `
})
export class CurrentResultsComponent {
  @Input()
  result: StockResult;
}
