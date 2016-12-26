import { browser, element, by } from 'protractor';

export class AngularTestingPage {
  navigateTo() {
    return browser.get('/');
  }

  getLabelText() {
    return element(by.css('app-root label')).getText();
  }
}
