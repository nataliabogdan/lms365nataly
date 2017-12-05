import { NightWatchBrowser as Browser } from 'nightwatch';
import { Helper } from '../../infrastructure/helpers/helper';
import { GuidGenerator } from '../../infrastructure/guid-generator';

let helper: Helper;
let scormTitle;
let scormTitleUpdated;

export = {



    before: (browser: Browser) => {
        browser.maximizeWindow();
        scormTitle = `!!!!!! bn`;
        scormTitleUpdated = `bn UPD`;
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


    'Update scorm package from storage.': () => {
        let key = GuidGenerator.instance.generate();
        helper.scormCreator.openEditForm(scormTitle);
        helper.scormCreator.editScorm({
            title: scormTitleUpdated,
            description: `desc ${key}`,
            showToc: false,
            showNavigation: false,
            openInNewWindow: false
        })
        helper.scormCreator.checkScormInList(scormTitleUpdated)

    },

};