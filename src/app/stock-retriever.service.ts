import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { StockResult } from './stock-result';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';

@Injectable()
export class StockRetrieverService {
  constructor(private http: Http) {
  }

  fetch(symbol: string): Observable<StockResult> {
    if (!symbol) {
      return null;
    }

    const params = new URLSearchParams();

    params.set('q', `select * from yahoo.finance.quotes where symbol in ("${symbol}")`);
    params.set('diagnostics', 'true');
    params.set('env', 'http://datatables.org/alltables.env');
    params.set('format', 'json');

    return this.http
      .get('https://query.yahooapis.com/v1/public/yql', { search: params })
      .map(this.parseResponse)

      // http://stackoverflow.com/a/36296015/941536
      .publishLast()
      .refCount()

      .catch(this.handleError);
  }

  private parseResponse(res: any): StockResult {
    const body = res.json();
    const quote = body.query.results.quote;

    const result: StockResult = {
      lastTradePrice: parseFloat(quote.LastTradePriceOnly),
      retrieved: body.query.created,
      symbol: quote.symbol
    };

    return result;
  }

  private handleError(error: any) {
    return Observable.throw(error.message
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server Error');
  }
}
