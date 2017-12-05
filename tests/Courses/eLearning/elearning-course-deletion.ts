// import { NightWatchBrowser as Browser } from 'nightwatch';
// import { Constants } from '../../../infrastructure/constants';
// import { Helper } from '../../../infrastructure/helpers/helper';
// // import { GuidGenerator } from '../../../infrastructure/guid-generator';

// let helper: Helper;
// // let key = GuidGenerator.instance.generate();
// let coursetitle;

// export = {
//     before: (browser: Browser) => {
//         coursetitle = `Elearning-Course-test_Upd`;
//         helper = new Helper(browser);
//         helper.user.loginAsLMSAdmin();
//     },

//     beforeEach: (browser: Browser) => {
//         helper.navigation.goToCourseCatalog();
//     },

//     'Delete eLearning Course.': () => {

//         helper.courseDeletion.DeleteCourse(coursetitle);
//         helper.browser.waitForElementVisible('div#courses-list-grid', Constants.Timeouts.Large);
//         // helper.browser.useXpath();
//         // helper.browser.assert.hidden('//a[text()="Elearning-Course-test_Updated"]'); - will be useful when a lot of courses will be created 
    
//     }
// }