import { NightWatchBrowser as Browser } from 'nightwatch';
//import { Constants } from '../../infrastructure/constants';
import { Helper } from '../../infrastructure/helpers/helper';

let helper: Helper;
let aiccTitle;


export = {
    before: (browser: Browser) => {
        browser.maximizeWindow();
        aiccTitle = `!aicc bn UPD`;
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();
    },
    beforeEach: (browser: Browser) => {
        helper.navigation.goToScorm();
        helper.scormCreator.goToScormStoragelistNewNav();
    },
         after: (browser: Browser) => {
         browser.end();
     },


    'Delete aicc package from storage.': () => {
        helper.scormCreator.openDeleteForm(aiccTitle)
        helper.scormCreator.checkScormNotInList(aiccTitle);

    },

};