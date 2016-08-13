import { provide } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { DeprecatedFormsModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { Observable } from 'rxjs';

import { AppComponent } from './app.component';
import { StockRetrieverService } from './stock-retriever.service';
import { StockResult } from './stock-result';

class TestStockRetrieverService {
  fetch(symbol: string): Observable<StockResult> {
    const testResult: StockResult = {
      lastTradePrice: 1,
      retrieved: new Date(),
      symbol: symbol
    };

    return <Observable<StockResult>>Observable.from([ testResult ]);
  }
}

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        provide(StockRetrieverService, { useClass: TestStockRetrieverService })
      ],
      imports: [
        DeprecatedFormsModule,
        HttpModule
      ]
    });
  });

  it('should create the app', async(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;

      expect(app).toBeTruthy();
    });
  }));

  it('should initially have no symbol', async(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;

      expect(app.symbol).toBeUndefined();
    });
  }));

  describe('OnInit', () => {
    it('should set MSFT stock symbol', async(() => {
      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;

        app.ngOnInit();

        expect(app.symbol).toBe('MSFT');
      });
    }));
  });

  describe('fetch', () => {
    it('should set null currentResult if no symbol', async(() => {
      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;

        app.symbol = null;

        app.fetch();

        expect(app.currentResult).toBeNull();
      });
    }));

    it('should set expected currentResult if symbol provided', async(() => {
      TestBed.compileComponents().then(() => {
        const testSymbol = 'TEST';
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;

        app.symbol = testSymbol;

        app.fetch();

        app.currentResult.subscribe(x => {
          expect(x.symbol).toBe(testSymbol);
        });
      });
    }));
  });
});
