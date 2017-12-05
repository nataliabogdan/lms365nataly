// import { NightWatchBrowser as Browser } from 'nightwatch';
// import { Constants } from '../../infrastructure/constants';
// import { Helper } from '../../infrastructure/helpers/helper';
// import { GuidGenerator } from '../../infrastructure/guid-generator';


// let helper: Helper;
// let key = GuidGenerator.instance.generate();
// let TrainingPlanTitle;

// export = {
//     before: (browser: Browser) => {
//         TrainingPlanTitle = `TrainingPlan-test_${key}`;
//         helper = new Helper(browser);
//         helper.user.loginAsLMSAdmin();
//     },

//     beforeEach: (browser: Browser) => {
//         helper.navigation.goToTrainingPlanList();
//     },

//     'Create  Training Plan with required fields filled.': () => {
//             helper.TrainingPlanCreation.goToCreationPageTrainingPlan()
//             helper.TrainingPlanCreation.create({                                               //select courses method is used in .create method
//                 title: TrainingPlanTitle,
//                 description: `TP_${key}`,
//                 category: 'trainingplan1',
//                 url: `TP_${key}`,
//                 numberCourses: 4
//             });

//         helper.browser.waitForElementPresent('div.courseCreatedLinksBlock', Constants.Timeouts.Medium);
//     },

//     'Create Training Plan with empty requied fields.': () => {              //courses are also not selected: method is not used in this test
//         helper.TrainingPlanCreation
//             helper.TrainingPlanCreation.goToCreationPageTrainingPlan()
//             helper.TrainingPlanCreation.create({
//                 title: '',
//                 category: '',
//                 url: '',
//                 description: ''
//             });
//         helper.browser
//             .useCss()
//             .isVisible('span#CourseName_validationMessage')
//             .isVisible('span[id="Categories.SelectedItems_validationMessage"]')
//             .isVisible('span[id="SiteUrl.RelativeUrl_validationMessage"]')
//             .isVisible('span#Courses_validationMessage');
//     },

//     'Edit created Training Plan.': () => {

//         helper.TrainingPlanEditor
//             .OpenTrainingPlanEditForm(TrainingPlanTitle)
//             .edit({
//                 title: TrainingPlanTitle,
//                 description: `UPD_Classroom_${key}`,
//                 category: 'UPD_classroom1',
//                 numberCourses: 3
                
//             });
//             helper.browser
//             .useXpath()
//             .waitForElementPresent('//div[contains(@class, "courseCreatedLinksBlock")]', Constants.Timeouts.Medium)
//             .click('//span[contains(@class, "icon-left-arrow")]');
//     }
// }

