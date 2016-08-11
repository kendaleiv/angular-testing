import { async, TestBed } from '@angular/core/testing';

import { CurrentResultsComponent } from './current-results.component';
import { StockResult } from './stock-result';

describe('CurrentResultsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CurrentResultsComponent
      ],
      providers: [
        CurrentResultsComponent
      ]
    });
  });

  it('should initially not show a result', async(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(CurrentResultsComponent);

      fixture.detectChanges();

      const element = fixture.debugElement.nativeElement;

      expect(element.textContent).not.toContain('retrieved');
    });
  }));

  it('should show a result when set', async(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(CurrentResultsComponent);

      const stockResult: StockResult = {
        lastTradePrice: 0,
        retrieved: new Date(),
        symbol: 'TEST'
      };

      fixture.componentInstance.result = stockResult;

      fixture.detectChanges();

      const element = fixture.nativeElement;

      expect(element.textContent).toContain('retrieved');
    });
  }));
});
