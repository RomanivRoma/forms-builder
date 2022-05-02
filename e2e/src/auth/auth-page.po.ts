import { browser, element, by, Key } from 'protractor';

export class AuthPage {
  navigateToLogin() {
    return browser.get('/login');
  }
  navigateToSignup() {
    return browser.get('/signup');
  }

  login(email: string, password: string) {
    const emailInput = element(by.css('[type="email"]'));
    emailInput.clear()
    emailInput.sendKeys(email);

    const passwordInput = element(by.css('[type="password"]'));
    passwordInput.clear();
    passwordInput.sendKeys(password);

    const signInButton = element(by.id('login'));
    signInButton.click();

    browser.driver.sleep(1500);
  }
  logout() {
      
    const logoutButton = element(by.id('logout'));
    logoutButton.click();

    browser.driver.sleep(1500);
  }
}
