// import { NightWatchBrowser as Browser } from 'nightwatch';
// import { Constants } from '../../../infrastructure/constants';
// import { Helper } from '../../../infrastructure/helpers/helper';
// import { GuidGenerator } from '../../../infrastructure/guid-generator';

// let helper: Helper;
// let key = GuidGenerator.instance.generate();
// let coursetitle;
// let coursetitle2;

// export = {
//     before: (browser: Browser) => {
//         coursetitle = `Classroom-Course-test`;
//         coursetitle2 ='Classroom-Course-test_UPD'
//         helper = new Helper(browser);
//         helper.user.loginAsLMSAdmin();
//     },

//     beforeEach: (browser: Browser) => {
//         helper.navigation.goToCourseCatalog();
//     },

//     'Create classroom course with required fields filled (no apps).': () => {
//         helper.courseCreator
//             .goToCreationPageClassroom()
//             .create({
//                 title: coursetitle,
//                 description: `classroom_${key}`,
//                 category: 'classroom1',
//                 url: `classroom_${key}`
//             });
//         helper.browser.waitForElementPresent('div.courseCreatedLinksBlock', Constants.Timeouts.Medium);
//     },


//     'Create classroom course empty required fields.': () => {
//         helper.courseCreator
//             .goToCreationPageClassroom()
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

//     'Create Classroom courses with the identical url.': () => {
//         let key = GuidGenerator.instance.generate();
//         let courseInfo = {
//             title: `classroom_${key}`,
//             category: 'category0',
//             url: `classroom_${key}`,
//             description: `classroom_${key}`
//         };

//         helper.courseCreator
//             .goToCreationPageClassroom()
//             .create(courseInfo);

//         helper.browser
//             .pause(Constants.Timeouts.Medium)
//             .waitForElementPresent('div.courseCreatedLinksBlock', Constants.Timeouts.Medium);

//         key = GuidGenerator.instance.generate();
//         courseInfo.title = `classroom_${key}`;

//         helper.navigation.goToCourseCatalog();
//         helper.courseCreator.goToCreationPageClassroom().create(courseInfo);

//         helper.browser.waitForElementVisible('span[id="SiteUrl.RelativeUrl_validationMessage"]', Constants.Timeouts.Medium);
//     },

// }
