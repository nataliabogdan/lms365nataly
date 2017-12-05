import { NightWatchBrowser as Browser } from 'nightwatch';
import { Helper } from './helpers/helper';
import { Constants } from './constants';

export class AppInstaller{

    private readonly _helper: Helper;

    public constructor(browser: Browser) {
        this._helper = new Helper(browser);
    }

    public installApp(appTitle: string): void {                      //selects and installs  App to install method
        // this._browser.useXpath(); //switching to xPath as locate startegy
        this._helper.navigation.addAnApp();
        this._helper.switchToClassicMode(); //opens site content page
        // this._browser.assert.containsText('#idStorefrontLabelItemAnchorSelect', 'Your Apps'), //find 'Your Apps' menu item  on the site content page 
        // this._browser
        // .waitForElementPresent('#idStorefrontSearchBox', Constants.Timeouts.Large)
        // .useCss()
        // .setValue('#idStorefrontSearchBox', appTitle) //finds search box on the site content page and sets 'QA' value in search box on the site content Page  
        // .click('#idStorefrontSearchBoxImageSpan'), //click search icon
        this._helper.browser
            .useXpath()
            .waitForElementPresent(`//*[@title="${appTitle}"]`, Constants.Timeouts.Large)
            .click(`//*[@title="${appTitle}"]`) //clicks on appTitle to select it for insallatio
            //     // .waitForElementPresent('//*[@id="idStorefrontLabelItemAnchorSelect"]', Constants.Timeouts.Large)
            //     .click('//li[contains(@class, "static ms-core-listMenu-selected")]//a[contains(@id, "idStorefrontLabelItemAnchorSelect")]')
            //             .waitForElementPresent(`//*[@title="${appTitle}"]`, Constants.Timeouts.Large)
            //             .click(`//*[@title="${appTitle}"]`)
            //             //*[@id="idStorefrontLabelItemAnchorSelect"]
            //             // .waitForElementPresent('//*[@title="${appTitle}"]')
            //             // this._browser.waitForElementPresent('iframe.ms-dlgFrame', Constants.Timeouts.Large)
            //             // this._browser.useCss()
            .pause(5000)
        // .getLocation('iframe.ms-dlgFrame')
        this._helper.goToiFrame('iframe.ms-dlgFrame', (frame) => {
            this._helper.browser
                .useCss()    //switching to css as locate strategy
                // .pause(5000)
                // .waitForElementPresent('#ctl00_PlaceHolderMain_BtnAllow', Constants.Timeouts.Large)
                .click('input#ctl00_PlaceHolderMain_BtnAllow'); //locating iFrame and pressing trust link to install selected App
            // .useXpath()
            // .click('//div[contains(@id, "s4-workspace")]//td[contains(@nowrap, "nowrap")]//input[contains(@id, "ctl00_PlaceHolderMain_BtnAllow")]')
            // .waitForElementPresent('#ctl00_PlaceHolderMain_LabelAppTitle', Constants.Timeouts.Large)
            // .assert.containsText('#ctl00_PlaceHolderMain_LabelAppTitle', 'lms.365.systems')
            //div[contains(@id, "s4-workspace")]//td[input[contains(@id, "ctl00_PlaceHolderMain_BtnAllow")]]
        });
        //     // console.log('selectApp`) //-// to show result in console of that step
    }

    public uninstallApp(appTitle: string): void {                  //uninstall App method
        this._helper.browser.useXpath() //switching to xPath as locate startegy
        this._helper.browser.click(`//a[span[text()="${appTitle}"]]`), //click on app to call elipsis actions(about,details,remove)
            this._helper.browser.pause(Constants.Timeouts.Medium)
        this._helper.browser.click('//div[@class="js-callout-footerArea"]/span/span/span[4]/a')
            ; //click on remova action
        this._helper.browser.acceptAlert(); //accepts broser allert (Are you sure to 'action'? OK/Cancel)
        //console.log(selectApp) - to show result in console of that step
    }
}