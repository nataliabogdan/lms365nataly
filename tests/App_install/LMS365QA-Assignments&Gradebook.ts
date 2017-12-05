import { NightWatchBrowser as Browser } from 'nightwatch';
import { AppInstaller } from '../../infrastructure/app-installer';
import { Helper } from '../../infrastructure/helpers/helper';


let helper: Helper;
let appInstaller: AppInstaller;

export = {
    before: (browser: Browser) => {
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();
        appInstaller=new AppInstaller(browser);
    },

    beforeEach: (browser: Browser) => {

    },

    'Install Assignments & Gradebook.': () => {
        appInstaller.installApp('LMS365 | Assignments & Gradebook');
    }
}







