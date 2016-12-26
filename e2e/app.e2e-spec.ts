import { AngularTestingPage } from './app.po';

describe('angular-testing App', function() {
  let page: AngularTestingPage;

  beforeEach(() => {
    page = new AngularTestingPage();
  });

  it('should display Stock Symbol label', () => {
    page.navigateTo();

    expect(page.getLabelText()).toContain('Stock Symbol');
  });
});
