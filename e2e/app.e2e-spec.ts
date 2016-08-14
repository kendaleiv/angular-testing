import { Angular2TestingPage } from './app.po';

describe('angular2-testing App', function() {
  let page: Angular2TestingPage;

  beforeEach(() => {
    page = new Angular2TestingPage();
  });

  it('should display Stock Symbol label', () => {
    page.navigateTo();

    expect(page.getLabelText()).toContain('Stock Symbol');
  });
});
