import { NightWatchBrowser as Browser } from 'nightwatch';
//import { Constants } from '../../infrastructure/constants';
import { Helper } from '../../infrastructure/helpers/helper';
//import { GuidGenerator } from '../../infrastructure/guid-generator';

let helper: Helper;
let lptitle;
//declare const WORKING_PATH:string;

export = {

    before: (browser: Browser) => {
        lptitle = '!bn learningpath published';
        browser.maximizeWindow();
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();
        helper.navigation.goToLearningPath();
    },

    after: (browser: Browser) => {
        browser.end();
    },


    ' Update Learning Path on Site Page from published to Unpublished': () => {
        helper.learningPathCreator.findLearningPath(lptitle)
        helper.browser.element('xpath', `//tr[td[contains(text(),'${lptitle}')]]//span[contains(@class, "icon-notpublished")]`, function (result) {
            if (result.value && result.value.ELEMENT) {
                helper.learningPathCreator
                    .openLpEditForm(lptitle)
                    .togglePublishing(true)
                    .saveLearningPath()
                helper.browser.pause(3000)
                    .useXpath().assert.attributeContains(`//tr[td[contains(text(),'${lptitle}')]]//span[contains(@class, "icon-notpublished") or contains(@class, "icon-published")]`, 'class', 'icon-published')
            } else {
                helper.learningPathCreator
                    .openLpEditForm(lptitle)
                    .togglePublishing(false)
                    .saveLearningPath()
                helper.browser.pause(3000)
                    .useXpath().assert.attributeContains(`//tr[td[contains(text(),'${lptitle}')]]//span[contains(@class, "icon-notpublished") or contains(@class, "icon-published")]`, 'class', 'icon-notpublished')
            }
        });
    },
};