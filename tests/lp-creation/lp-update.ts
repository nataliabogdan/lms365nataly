import { NightWatchBrowser as Browser } from 'nightwatch';
//import { Constants } from '../../infrastructure/constants';
import { Helper } from '../../infrastructure/helpers/helper';
import { GuidGenerator } from '../../infrastructure/guid-generator';

let helper: Helper;
let key = GuidGenerator.instance.generate();
let lptitle;
let lptitleUpdated;
//declare const WORKING_PATH:string;

export = {

    //   '@disabled': true,

    before: (browser: Browser) => {
        lptitle = '!bn learningpath published';
        lptitleUpdated = '!lp edit';
        browser.maximizeWindow();
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();
    },

    beforeEach: (browser: Browser) => {
        helper.navigation.goToLearningPath();
    },

         after: (browser: Browser) => {
         browser.end();
     },


    ' Update Learning Path on Site Page': () => {

        helper.browser.pause(2000)
        helper.learningPathCreator.openLpEditForm(lptitle)
        helper.learningPathCreator.edit({
            title: lptitleUpdated,
            description: `UPD_test_${key}`,
            items:[

            ]
        })
            .saveLearningPath()
    },
};