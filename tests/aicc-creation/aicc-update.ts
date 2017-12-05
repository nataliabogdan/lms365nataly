import { NightWatchBrowser as Browser } from 'nightwatch';
import { Helper } from '../../infrastructure/helpers/helper';
import { GuidGenerator } from '../../infrastructure/guid-generator';

let helper: Helper;
let aiccTitle;
let aiccTitleUpdated;

export = {

    '@disabled': true,
    before: (browser: Browser) => {
        browser.maximizeWindow();
        aiccTitle = `!aicc bn`
        aiccTitleUpdated = `!aicc bn UPD`
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();
        helper.navigation.goToScorm();
        helper.scormCreator.goToScormStoragelistNewNav()
    },
    beforeEach: (browser: Browser) => {

    },
         after: (browser: Browser) => {
         browser.end();
     },


    'Update aicc package from storage.': () => {
        let key = GuidGenerator.instance.generate();
        helper.scormCreator.openEditForm(aiccTitle);
        helper.scormCreator.editAICC({
            title: aiccTitleUpdated,
            description: `desc ${key}`,
            openInNewWindow: false,
            showSubmit: false,
            autoClosePlayer: false
        })
        helper.scormCreator.checkScormInList(aiccTitleUpdated)
    }

};