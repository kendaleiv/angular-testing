//
// With services that make network requests in actual use, you could
// mock the backend, make actual network call(s), or both. You decide!
//

import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { StockRetrieverService } from './stock-retriever.service';

describe('StockRetrieverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StockRetrieverService
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should construct', async(inject([StockRetrieverService], (service) => {
    expect(service).toBeDefined();
  })));
});

describe('StockRetrieverService (Mocked)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StockRetrieverService,

        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [
        HttpModule
      ]
    });
  });

  describe('fetch', () => {
    const mockQuote = {
      LastTradePriceOnly: '123.45',
      symbol: 'TEST'
    };

    const mockResponse = {
      query: {
        created: new Date().toISOString(),
        results: {
          quote: mockQuote
        }
      }
    };

    it('should return null when symbol not specified', async(inject(
      [StockRetrieverService, MockBackend], (service, mockBackend) => {

      mockBackend.connections.subscribe(conn => {
        throw new Error('No requests should be made.');
      });

      const result = service.fetch(null);

      expect(result).toBeNull();
    })));

    it('should parse response from endpoint', async(inject(
      [StockRetrieverService, MockBackend], (service, mockBackend) => {

      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
      });

      const result = service.fetch(mockQuote.symbol);

      result.subscribe(res => {
        expect(res).toEqual({
          lastTradePrice: 123.45,
          symbol: mockQuote.symbol,
          retrieved: mockResponse.query.created
        });
      });
    })));

    it('should not make duplicate requests for the same symbol', async(inject(
      [StockRetrieverService, MockBackend], (service, mockBackend) => {

      let requestInvocationCount = 0;

      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));

        requestInvocationCount++;
      });

      const result = service.fetch(mockQuote.symbol);

      result.subscribe(res => { });
      result.subscribe(res => { });

      expect(requestInvocationCount).toBe(1);
    })));
  });
});
