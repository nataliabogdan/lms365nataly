// import { NightWatchBrowser as Browser } from 'nightwatch';
// //import { Constants } from '../../infrastructure/constants';
// import { Helper } from '../../../infrastructure/helpers/helper';


// let helper: Helper;

// export = {
//     before: (browser: Browser) => {
//         browser.maximizeWindow();
//         helper = new Helper(browser);
//         helper.user.loginAsLMSAdmin();
//     },

//     beforeEach: (browser: Browser) => {
//         helper.navigation.goToCourseCatalog();
//     },
//     after: (browser: Browser) => {
//         browser.end();
//     },

//     'Check web parts on elearning course with apps': () => {
//         helper.courseCreator
//             .openActionsForElearningWithAppsCourse()
//             .openViewLink()
//             .makeScreenshotForElearningWithApps();
//     },


//     'Check web parts on elearning course without apps': () => {
//         helper.courseCreator
//             .openActionsForElearningWithoutAppsCourse()
//             .openViewLink()
//             .makeScreenshotForElearningWitouthApps();

//     },

//     'Check web parts on classroom course without apps': () => {
//         helper.courseCreator
//             .openActionsForClassroomCourse()
//             .openViewLink()
//             .makeScreenshotForClassroom();
//     },

//     'Check web parts on training plan ': () => {
//         helper.courseCreator
//             .goToTrainingPlanListNewNav()
//             .openActionsForTrainingPlan()
//             .openViewLinkForTrainingPlan()
//             .makeScreenshotForTrainingPlan();
//     },
// };