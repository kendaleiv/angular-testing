import { browser, element, by } from 'protractor';

export class Angular2TestingPage {
  navigateTo() {
    return browser.get('/');
  }

  getLabelText() {
    return element(by.css('app-root label')).getText();
  }
}
