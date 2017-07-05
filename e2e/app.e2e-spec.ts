import { SignupWizardPage } from './app.po';

describe('signup-wizard App', () => {
  let page: SignupWizardPage;

  beforeEach(() => {
    page = new SignupWizardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
