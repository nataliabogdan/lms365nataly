// import { NightWatchBrowser as Browser } from 'nightwatch';
// import { Constants } from '../../../infrastructure/constants';
// import { Helper } from '../../../infrastructure/helpers/helper';
// import { GuidGenerator } from '../../../infrastructure/guid-generator';

// let helper: Helper;
// let key = GuidGenerator.instance.generate();
// let coursetitle;
// let  coursetitleUpdated;
// let contentPackageTitle;

// export = {
//     before: (browser: Browser) => {
//         coursetitle = 'Elearning-Course-test';
//         coursetitleUpdated  = 'Elearning-Course-test_Updated';
//         contentPackageTitle = '#1';

//         helper = new Helper(browser);
//         helper.user.loginAsLMSAdmin();
//     },

//     beforeEach: (browser: Browser) => {
//         helper.navigation.goToCourseCatalog();
//     },

//     'Edit elearning course:add Scrom/Quizzes': () => {

//         // helper.courseEditor.OpenCourseEditForm(coursetitle)
//         helper.courseEditor.edit({
//             title:  coursetitleUpdated ,
//             description: `UPD_Elearning_${key}`,
//             category: 'UPDelearning1',
//             // numberContentPackages: 5,
//             // numberQuizzes: 7
//         });
//         helper.navigation.goToCourseCatalog();
//         helper.browser.useXpath();
//         helper.browser.waitForElementPresent('//a[span[contains(@class, "icon-ellipsis")]]', Constants.Timeouts.Large)
//         helper.browser.assert.visible('//a[span[contains(@class, "icon-ellipsis")]]');
//         helper.browser.assert.visible('//a[text()="Elearning-Course-test_Updated"]');
        
//     }
// } 