import { browser, by, element, logging } from 'protractor';
import { AppPage } from './app.po';
import {code as dragAndDrop} from 'html-dnd';

describe('Form Builder', function() {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();
    page.navigateToLogin();

    page.login()
  });

  beforeEach(() => {
    page.navigateTo()
  })

  it('should add/delete element to form(button)', async () => {

    page.addToForm(0)
    page.addToForm(1)
    const dropContent = element.all(by.css('app-drop-item'));
    
    
    expect(await dropContent.count()).toEqual(2);


    dropContent.get(0).click()

    const deleteButton = element.all(by.css('.delete'));
    deleteButton.click()
    
    expect(await dropContent.count()).toEqual(1);

  });

  it('should clearform', async () => {
    page.addToForm(0)
    page.addToForm(1)
    page.addToForm(2)

    const dropContent = element.all(by.css('app-drop-item'));
    expect(await dropContent.count()).toEqual(3);
    
    const formToggle = element(by.css("#mat-button-toggle-1-button"))
    formToggle.click()

    
    const clearButton = element(by.css("#clear"))
    clearButton.click()

    expect(await dropContent.count()).toEqual(0);
  })

  it('should add element to form(drag & drop)', async () => {
    // const items = element.all(by.css('app-drag-item'))

    // let item = await items.get(0).getWebElement()
    // const target = await element(by.css('.drop__body')).getWebElement()
    
    // browser.driver.executeScript(dragAndDrop, item, target);

    // browser.driver.sleep(3000)
    // const dropContent = element.all(by.css('app-drop-item'));
    
    
    // expect(await dropContent.count()).toEqual(3);
  })


  it('should select/unselect element ', async () => {
    page.addToForm(0) 
    const dropContent = element.all(by.css('app-drop-item'));
    const selectedValue = element(by.css('mat-button-toggle-group.formElementGroup'))

    dropContent.get(0).click()

    expect(await selectedValue.getAttribute('ng-reflect-value')).toBe('element');

    dropContent.get(0).click()

    expect(await selectedValue.getAttribute('ng-reflect-value')).toBe('form');
    
  })

  it('should change element styles ', async () => {
    page.addToForm(0) 
    page.addToForm(10) 
    const dropContent = element.all(by.css('app-drop-item'));

    dropContent.get(0).click()


    const valueInput = element(by.css('[formcontrolname="value"]'))
    const expectedValue = 'Text in input'
    valueInput.clear()
    valueInput.sendKeys(expectedValue)
    expect(await dropContent.get(0).getText()).toBe(expectedValue)

    const colorInput = element(by.css('[formcontrolname="background"]'))
    const expectedColor = '#000000'
    colorInput.clear()
    colorInput.sendKeys(expectedColor)
    expect(await dropContent.get(0).getCssValue('backgroundColor')).toBe('rgba(0, 0, 0, 0)')

    
    // dropContent.get(1).click()


  })

  it('should change form styles ', async () => {

    const formToggle = element(by.css("#mat-button-toggle-1-button"))
    formToggle.click()

    const titleInput = element(by.css('[formcontrolname="title"]'))
    const titleBlock = element(by.css('.drop__header h1'))
    titleInput.clear()
    const expectedTitle = 'Changed title'
    titleInput.sendKeys(expectedTitle)
    expect(await titleBlock.getText()).toBe(expectedTitle)

  })


  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  afterAll(async () => {
    page.logout()
  })
}); 
