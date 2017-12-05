import { NightWatchBrowser as Browser } from 'nightwatch';
import { Constants } from '../../../infrastructure/constants';
import { Helper } from '../../../infrastructure/helpers/helper';
import { GuidGenerator } from '../../../infrastructure/guid-generator';

let helper: Helper;
let key = GuidGenerator.instance.generate();
let  coursetitleUpdated ;

export = {
    before: (browser: Browser) => {
        coursetitleUpdated  = 'Webinar-Course-test_UPD';
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();
    },

    beforeEach: (browser: Browser) => {
        helper.navigation.goToCourseCatalog();
    },

    'Edit Webinar course.': () => {
        helper.courseEditor
            // .OpenCourseEditForm(coursetitle)
            .edit({
                title: coursetitleUpdated ,
                description: `UPD_Webinar_${key}`,
                category: 'UPD_webinar1',
                url: `UPD_webinar_${key}`,
                // numberContentPackages: 5,
                // numberQuizzes: 7
            });
            helper.navigation.goToCourseCatalog();
            helper.browser.useXpath();
            helper.browser.waitForElementPresent('//a[span[contains(@class, "icon-ellipsis")]]', Constants.Timeouts.Large)
            helper.browser.assert.visible('//a[span[contains(@class, "icon-ellipsis")]]');
            helper.browser.assert.visible('//a[text()="Webinar-Course-test_UPD"]');
    },

}