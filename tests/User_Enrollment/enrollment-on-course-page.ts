// import { NightWatchBrowser as Browser } from 'nightwatch';
// import { Constants } from '../../infrastructure/constants';
// import { Helper } from '../../infrastructure/helpers/helper';
// import { GuidGenerator } from '../../infrastructure/guid-generator';

// let helper: Helper;
// let key = GuidGenerator.instance.generate();
// let coursetitle;
// let courseEditTitle;
// let courseUrl;


// export = {
//     before: (browser: Browser) => {
//         coursetitle = courseUrl = `Enrollment-test_${key}`;
//         courseEditTitle = `Edit-title_${key}`;
//         helper = new Helper(browser);
//         helper.user.loginAsLMSAdmin();
//     },

//     beforeEach: (browser: Browser) => {

//         helper.navigation.goToCourseCatalog();
//     },



//     'Enroll Learner from eLearning Course_Creation Form.': () => {

//         helper.courseCreator
//             .goToCreationPageElearningOld()
//             .create({
//                 title: coursetitle,
//                 category: 'enrollmenttest1',
//                 url: courseUrl,
//                 description: `rc1enroll_${key}`,
//                 learners: 'rc1@lms365qa.onmicrosoft.com'

//             });
//         helper.browser
//             .useXpath()
//             .waitForElementPresent('//div[contains(@class, "courseCreatedLinksBlock")]', Constants.Timeouts.Medium)
//             .click('//span[contains(@class, "icon-left-arrow")]')
//         helper.courseCreator.ViewCourse(coursetitle)
//         helper.user
//             .logout()
//             .loginAsLearner();
//         helper.browser.url(`https://lms365qa.sharepoint.com/sites/prodqa/${courseUrl}`)
//         helper.user.logout()
//             .loginAsLMSAdmin();
//         helper.navigation.goToCourseCatalog()

//     },

// //     'Enroll Learner from eLearning Course_Edit form.': () => {
// //         helper.courseEditor.OpenCourseEditForm(coursetitle)
// //             .edit({
// //                 title: courseEditTitle,
// //                 category: 'enrollmenttest2',
// //                 url: `Enrollment-test-editform_${key}`,
// //                 description: `rc3enroll_${key}`,
// //                 learners: 'rc3@lms365qa.onmicrosoft.com'

// //             });

// //         helper.browser
// //             .useXpath()
// //             .waitForElementPresent('//div[contains(@class, "courseCreatedLinksBlock")]', Constants.Timeouts.Medium)
// //             .click('//span[contains(@class, "icon-left-arrow")]');
// //         helper.courseCreator.ViewEditedCourse(courseEditTitle);
// //         helper.user.logout()
// //             .loginAsLearner();
// //         helper.browser.url(`https://lms365qa.sharepoint.com/sites/prodqa/${courseUrl}`)
// //     },
// // }
