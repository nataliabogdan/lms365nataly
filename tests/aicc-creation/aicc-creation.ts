import { NightWatchBrowser as Browser } from 'nightwatch';
import { Helper } from '../../infrastructure/helpers/helper';
import { GuidGenerator } from '../../infrastructure/guid-generator';

let helper: Helper;
let aiccTitle;

export = {

    '@disabled': true,
    before: (browser: Browser) => {
        browser.maximizeWindow();
        aiccTitle = `!aicc bn`
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();
        helper.navigation.goToScorm();
        helper.scormCreator.goToScormStoragelistNewNav()
    },

         after: (browser: Browser) => {
         browser.end();
     },


     'Upload aicc package to storage.': () => {
        let key = GuidGenerator.instance.generate();

        helper.scormCreator.createAICC({
            title: aiccTitle,
            description: `desc ${key}`,
            openInNewWindow: true,
            showSubmit: true,
            autoClosePlayer: true


        });
    },

};