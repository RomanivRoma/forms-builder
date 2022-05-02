import { browser, by, element } from "protractor";

export class AppPage {
    addButton = element.all(by.css('app-drag-item button.add__button'));

    addToForm(index: number) {
        this.addButton.get(index).click()
    }

    navigateTo() {
        return browser.get('/');
    }
    navigateToLogin() {
        return browser.get('/login');
    }

    login() {
        const emailInput = element(by.css('[type="email"]'));
        emailInput.sendKeys('roma@gmail.com');
    
        const passwordInput = element(by.css('[type="password"]'));
        passwordInput.sendKeys('1234');
    
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
