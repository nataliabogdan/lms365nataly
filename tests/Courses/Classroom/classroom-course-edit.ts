// import { NightWatchBrowser as Browser } from 'nightwatch';
// // import { Constants } from '../../../infrastructure/constants';
// import { Helper } from '../../../infrastructure/helpers/helper';
// import { GuidGenerator } from '../../../infrastructure/guid-generator';

// let helper: Helper;
// let key = GuidGenerator.instance.generate();
// let coursetitle;
// let coursetitleUpdated;
// export = {
//     before: (browser: Browser) => {
//         coursetitle = 'Classroom-Course-test';
//         coursetitleUpdated = 'Classroom-Course-test_Updated';
//         helper = new Helper(browser);
//         helper.user.loginAsLMSAdmin();
//     },

//     beforeEach: (browser: Browser) => {
//         helper.navigation.goToCourseCatalog();
//     },

//     'Edit Classroom course.': () => {

//         helper.courseEditor.OpenCourseEditForm(coursetitle)
//         helper.courseEditor.edit({
//             title: coursetitleUpdated,
//             description: `UPD_Classroom_${key}`,
//             category: 'UPD_classroom1'
//         });

//     }
// }