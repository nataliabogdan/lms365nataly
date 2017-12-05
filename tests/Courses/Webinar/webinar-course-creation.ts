import { NightWatchBrowser as Browser } from 'nightwatch';
import { Constants } from '../../../infrastructure/constants';
import { Helper } from '../../../infrastructure/helpers/helper';
import { GuidGenerator } from '../../../infrastructure/guid-generator';

let helper: Helper;
let key = GuidGenerator.instance.generate();
let coursetitle;

export = {
    before: (browser: Browser) => {
        coursetitle = `Webinar-Course-test`;
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();
    },

    beforeEach: (browser: Browser) => {
        helper.navigation.goToCourseCatalog();
    },

    'Create  webinar course with required fields filled (no apps).': () => {
        helper.courseCreator
            .goToCreationPageWebinar()
            .create({
                title: coursetitle,
                description: `webinar_${key}`,
                category: 'webinar1',
                url: `webinar_${key}`
            });
        helper.browser.waitForElementPresent('div.courseCreatedLinksBlock', Constants.Timeouts.Medium);
    },

    'Create webinar course empty required fields.': () => {
        helper.courseCreator
            .goToCreationPageWebinar()
            .create({
                title: '',
                category: '',
                url: '',
                description: ''
            });

        helper.browser.assert.visible('span#CourseName_validationMessage');
        helper.browser.assert.visible('span[id="Categories.SelectedItems_validationMessage"]');
        helper.browser.assert.visible('span[id="SiteUrl.RelativeUrl_validationMessage"]');
    },

    'Create webinar courses with the identical url.': () => {
        let key = GuidGenerator.instance.generate();
        let courseInfo = {
            title: `ui-test_${key}`,
            category: 'category0',
            url: `ui-test_${key}`,
            description: `ui-test_${key}`
        };

        helper.courseCreator
            .goToCreationPageWebinar()
            .create(courseInfo);

        helper.browser
            .pause(Constants.Timeouts.Medium)
            .waitForElementPresent('div.courseCreatedLinksBlock', Constants.Timeouts.Medium);

        key = GuidGenerator.instance.generate();
        courseInfo.title = `ui-test_${key}`;

        helper.navigation.goToCourseCatalog();
        helper.courseCreator
            .goToCreationPageWebinar()
            .create(courseInfo);

        helper.browser.waitForElementVisible('span[id="SiteUrl.RelativeUrl_validationMessage"]', Constants.Timeouts.Medium);
    }

}
