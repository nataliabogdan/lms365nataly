import { NightWatchBrowser as Browser } from 'nightwatch';
import { AppInstaller } from '../../infrastructure/app-installer';
import { Helper } from '../../infrastructure/helpers/helper';

let helper: Helper;
let appInstaller: AppInstaller;

export = {
    before: (browser: Browser) => {
        helper = new Helper(browser);
        appInstaller=new AppInstaller(browser);
        helper.user.loginAsLMSAdmin();
        helper.browser.useXpath();
    },

    beforeEach: (browser: Browser) => {

    },

    'Uninstall LMS365 Assignments & Gradebook QA.': () => {
        helper.navigation.siteContent()
        // helper.browser.pause(5000)
        helper.switchToClassicMode()
        // helper.browser.pause(5000)
        appInstaller.uninstallApp('LMS365 | Assignments & Gradebook QA"')
        // helper.browser.pause(3000);
    }

}







