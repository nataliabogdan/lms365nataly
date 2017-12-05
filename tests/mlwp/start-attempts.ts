import { NightWatchBrowser as Browser } from 'nightwatch';
import { Helper } from '../../infrastructure/helpers/helper';

let helper: Helper;

/// ADD TO MLWP learning items 'LP for MLWP', 'SCORM for MLWP', 'QUIZ for MLWP'

export = {
    before: (browser: Browser) => {
        browser.maximizeWindow();
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();
        helper.navigation.goToMlwp();
    },

    after: (browser: Browser) => {
        browser.end();
    },

    ' Start LP': () => {
        helper.mlwpHelper.startAttempt("LP for MLWP");
    },

    ' Start Scorm': () => {
        helper.mlwpHelper.startAttempt("SCORM for MLWP");
    },

    ' Start QUIZ': () => {
        helper.mlwpHelper.startAttempt("QUIZ for MLWP");

    },
};
