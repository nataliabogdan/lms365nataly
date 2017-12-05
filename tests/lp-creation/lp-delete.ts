import { NightWatchBrowser as Browser } from 'nightwatch';
//import { Constants } from '../../infrastructure/constants';
import { Helper } from '../../infrastructure/helpers/helper';
//import { GuidGenerator } from '../../infrastructure/guid-generator';

let helper: Helper;
let lptitle;
//declare const WORKING_PATH:string;

export = {

    // '@disabled': true,

    before: (browser: Browser) => {
        lptitle = '!lp edit';
        browser.maximizeWindow();
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();
        helper.navigation.goToLearningPath();
    },

         after: (browser: Browser) => {
         browser.end();
     },

    ' Delete Learning Path on Site Page': () => {

        helper.browser.pause(2000)
        helper.learningPathCreator.deleteLp(lptitle)
        helper.learningPathCreator.checkLPNotInList(lptitle)

    },
};