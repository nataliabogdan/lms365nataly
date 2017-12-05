// import { NightWatchBrowser as Browser } from 'nightwatch';
// import { Constants } from '../../infrastructure/constants';
// import { Helper } from '../../infrastructure/helpers/helper';
// import { GuidGenerator } from '../../infrastructure/guid-generator';

// let helper: Helper;
// let task_name: string = 'TASK_';
// let key = GuidGenerator.instance.generate();
// declare const WORKING_PATH: string; // repository path

// export = {
//     before: (browser: Browser) => {
//         helper = new Helper(browser);
//         helper.user.loginAsLMSAdmin();
//         helper.navigation.goToAssignments();
//     },
//     after: (browser: Browser) => {
//         browser.end();
//     },

//     'Create assignment with file attached': () => {

//         helper.assignmentCreator
//             .goToCreationPage()
//             .create({
//                 title: `${task_name + key}`,
//                 description: `${task_name + key}`,
//                 tag: `${task_name + key}`,
//                 open_date: new Date(),
//                 due_date: new Date(),
//                 upload_file: `${WORKING_PATH}/files/Doc1.docx`,
//             });
//         helper.browser.waitForElementPresent('table#assignmentsList', Constants.Timeouts.Large);
//     },

//     'Logout and login as Learner': () => {
//         helper.user
//             .logout()
//             .loginAsLearner();
//         helper.navigation.goToAssignments();
//     },

//     'Submit assignment by Learner with new documents': (browser: Browser) => {

//         helper.assignmentCreator
//             .editAssignment(task_name)
//             .createWordInTask()
//             .createExcelInTask()
//             .createPresentationInTask()
//             .uploadFileInTask(`${WORKING_PATH}/files/Doc1.docx`)
//             .submitAssignmentTask('Learner')
//             .checkStatus(task_name, 'Submitted')
//     },

//     'Logout and login as LMSAdmin': () => {
//         helper.user
//             .logout()
//             .loginAsLMSAdmin();
//         helper.navigation.goToAssignments();
//     },

//     'Approve assignment by LMSAdmin with new documents': () => {
//         helper.assignmentCreator
//             .viewAssignment(task_name)
//             .editAssignmentTask(Constants.Users.Learner.name)
//             .uploadFileInTask(`${WORKING_PATH}/files/Excel1.xlsx`)
//             .createWordInTask()
//             .createExcelInTask()
//             .createPresentationInTask()
//             .approveAssignmentTask('Admin')
//             .checkStatus(Constants.Users.Learner.name, 'Completed')
//         helper.browser.pause(3000)
//     },

//     'Delete assignment': () => {
//         helper.navigation.goToAssignments();
//         helper.assignmentCreator.deleteAssignment(task_name);
//     },
// }