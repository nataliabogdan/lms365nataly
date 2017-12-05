import { NightWatchBrowser as Browser } from 'nightwatch';
import { Constants } from '../../infrastructure/constants';
import { Helper } from '../../infrastructure/helpers/helper';

let helper: Helper;

export = {
    before: (browser: Browser) => {
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();
    },
    
    after: (browser: Browser) => {
        browser.end();
    },

  'Check MLWP settings': () => {

        helper.browser
            .waitForElementPresent('.ef-mlap-button-settings.menu-header-button', Constants.Timeouts.Large)
            .click('.ef-mlap-button-settings.menu-header-button')
            .waitForElementPresent('.mlapSettingsTable', Constants.Timeouts.Large)
            .waitForElementPresent('.checkbox-right', Constants.Timeouts.Medium)
            .waitForElementPresent('.mlapFilterLine', Constants.Timeouts.Medium)
            .click('.menu-header-button.k-state-border-down.ms-qcb-button')
            .waitForElementPresent('.ef-mlap-container', Constants.Timeouts.Large)      
    },
}