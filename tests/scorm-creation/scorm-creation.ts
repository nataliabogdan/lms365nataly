import { NightWatchBrowser as Browser } from 'nightwatch';
import { Helper } from '../../infrastructure/helpers/helper';
import { GuidGenerator } from '../../infrastructure/guid-generator';

let helper: Helper;
let scormTitle;

export = {

    // '@disabled': true,
    before: (browser: Browser) => {
        browser.maximizeWindow();
        scormTitle = `!!!!!! bn`;
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

    'Upload scorm package to storage.': () => {
        let key = GuidGenerator.instance.generate();

        helper.scormCreator.createScorm({
            title: scormTitle,
            description: `desc ${key}`,
            showToc: true,
            showNavigation: true,
            openInNewWindow: true


        });
    },

    'Download scorm package': () => {
        helper.scormCreator
            .goToScormStoragelistNewNav()
            .downloadPackage(`${scormTitle}`,'bn.zip')
    },

};