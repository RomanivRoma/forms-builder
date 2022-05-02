import { browser, by, element, logging } from 'protractor';
import { AuthPage } from './auth-page.po';

describe('Authentication', function() {

  let page: AuthPage;

  beforeEach(() => {
    page = new AuthPage();
  });

  it('should check on login', async () => {
    page.navigateToLogin();

    page.login('roma@gmail.com', '1234')

    const expected = 'roma'
    const userBlock = element(by.css('.user'));
    const userLogin = await userBlock.getText()
    expect(userLogin).toEqual(expected);

    page.logout()

  });

  it('should display error when login', async () => {
    page.navigateToLogin();

    page.login('test@gmail.com', '1234')

    const errorBlock = element(by.css('.invalid-feedback'));

    expect(await errorBlock.getText()).toBe('Cannot find user');


  });

  it('should logout', async () => {
    page.login('roma@gmail.com', '1234')
    page.logout()

    const userBlock = element(by.css('[routerlink="/login"]'));
    expect(await userBlock.getText()).toBeTruthy()

  })

  afterEach(async () => {

    // const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });

}); 
