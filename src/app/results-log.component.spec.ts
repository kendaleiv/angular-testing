import { async, TestBed } from '@angular/core/testing';

import { ResultsLogComponent } from './results-log.component';
import { StockResult } from './stock-result';

describe('ResultsLogComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultsLogComponent
      ]
    });
  });

  it('should initially not show a result', async(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(ResultsLogComponent);

      fixture.detectChanges();

      const element = fixture.nativeElement;

      expect(element.textContent).not.toContain('retrieved');
    });
  }));

  it('should add result to list', async(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(ResultsLogComponent);

      const stockResult: StockResult = {
        lastTradePrice: 0,
        retrieved: new Date(),
        symbol: 'TEST'
      };

      fixture.componentInstance.result = stockResult;

      fixture.detectChanges();

      const element = fixture.nativeElement;

      expect(element.textContent).toContain('TEST');
    });
  }));

  it('should maintain existing results in list', async(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(ResultsLogComponent);

      const stockResult: StockResult = {
        lastTradePrice: 0,
        retrieved: new Date(),
        symbol: 'TEST'
      };

      fixture.componentInstance.result = stockResult;

      fixture.detectChanges();

      const stockResult2: StockResult = {
        lastTradePrice: 0,
        retrieved: new Date(),
        symbol: 'ABC'
      };

      fixture.componentInstance.result = stockResult2;

      fixture.detectChanges();

      const element = fixture.nativeElement;

      expect(element.textContent).toContain('TEST');
    });
  }));
});
