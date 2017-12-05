// import { NightWatchBrowser as Browser } from 'nightwatch';
// import { Constants } from '../../../infrastructure/constants';
// import { Helper } from '../../../infrastructure/helpers/helper';
// import { GuidGenerator } from '../../../infrastructure/guid-generator';

// let helper: Helper;
// let key = GuidGenerator.instance.generate();
// let coursetitle;

// export = {
//     before: (browser: Browser) => {
//         coursetitle = `Elearning-Course-test`;
//         helper = new Helper(browser);
//         helper.user.loginAsLMSAdmin();
//     },

//     beforeEach: (browser: Browser) => {
//         helper.navigation.goToCourseCatalog();
//     },

//     'Create elearning course with required fields filled .': () => {
//         helper.courseCreator
//             .goToCreationPageElearningOld()
//             .create({
//                 title: coursetitle,
//                 category: 'elearning',
//                 url: `elearning-test_${key}`,
//                 description: `elearning _${key}`,
//                 // numberContentPackages:1,
//                 // numberQuizzes:3

//             });
//         helper.browser.useXpath()
//         helper.browser.waitForElementPresent('//div[contains(@class, "courseCreatedLinksBlock")]', Constants.Timeouts.Medium);
//         helper.browser.click('//span[contains(@class, "icon-left-arrow")]')
//         // helper.browser.end()
//     },


//     'Create course empty required fields.': () => {
//         helper.courseCreator
//             .goToCreationPageElearningOld()
//             .create({
//                 title: '',
//                 category: '',
//                 url: '',
//                 description: ''
//             });
//         helper.browser.assert.visible('span#CourseName_validationMessage');
//         helper.browser.assert.visible('span[id="Categories.SelectedItems_validationMessage"]');
//         helper.browser.assert.visible('span[id="SiteUrl.RelativeUrl_validationMessage"]');
//     },

// //     'Create courses with the identical title and url.': () => {
// //         let key = GuidGenerator.instance.generate();
// //         let courseInfo = {
// //             title: `ui-test_${key}`,
// //             category: 'category0',
// //             url: `ui-test_${key}`,
// //             description: `ui-test_${key}`
// //         };

// //         helper.courseCreator
// //             .goToCreationPageElearningOld()
// //             .create(courseInfo);

// //         helper.browser
// //             .pause(Constants.Timeouts.Medium)
// //             .waitForElementPresent('div.courseCreatedLinksBlock', Constants.Timeouts.Medium);

// //         key = GuidGenerator.instance.generate();
// //         courseInfo.title = `ui-test_${key}`;

// //         helper.navigation
// //             .goToCourseCatalog();
// //         helper.courseCreator
// //             .goToCreationPageElearningOld()
// //             .create(courseInfo);

// //         helper.browser.waitForElementVisible('span[id="SiteUrl.RelativeUrl_validationMessage"]', Constants.Timeouts.Medium);
// //     },
// }
