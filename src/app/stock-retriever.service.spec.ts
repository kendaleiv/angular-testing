//
// With services that make network requests in actual use, you could
// mock the backend, make actual network call(s), or both. You decide!
//

import { async, inject, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

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

  describe('fetch', () => {
    it('should return null when symbol not specified', async(inject([StockRetrieverService], (service) => {
      const result = service.fetch(null);

      expect(result).toBeNull();
    })));

/* TODO: Use MockBackend or similar for these tests:
    it('should call expected endpoint', async(inject([StockRetrieverService], (service) => {
    })));

    it('should parse response from endpoint', async(inject([StockRetrieverService], (service) => {
    })));

    it('should not make duplicate requests for the same symbol', async(inject([StockRetrieverService], (service) => {
    })));
*/
  });
});
