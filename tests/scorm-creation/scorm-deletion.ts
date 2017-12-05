import { NightWatchBrowser as Browser } from 'nightwatch';
//import { Constants } from '../../infrastructure/constants';
import { Helper } from '../../infrastructure/helpers/helper';

let helper: Helper;
let scormTitle;


export = {
    before: (browser: Browser) => {
        browser.maximizeWindow();
        helper = new Helper(browser);
        scormTitle = `bn UPD`;
        helper.user.loginAsLMSAdmin();
    },
    beforeEach: (browser: Browser) => {
        helper.navigation.goToScorm();
        helper.scormCreator.goToScormStoragelistNewNav();
    },
         after: (browser: Browser) => {
         browser.end();
     },


    'Delete scorm package from storage.': () => {
       
        helper.scormCreator.openDeleteForm(scormTitle)
        helper.scormCreator.checkScormNotInList(scormTitle);
    },

};