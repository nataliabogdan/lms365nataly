// import { NightWatchBrowser as Browser } from 'nightwatch';
// import { Constants } from './constants';
// import { CourseInfo } from './models';
// import { Helper } from '../infrastructure/helpers/helper'
// declare const WORKING_PATH: string;

// export class CourseCreator {
//     private readonly _browser: Browser;
//     protected readonly _helper: Helper;

//     public constructor(browser: Browser) {
//         this._browser = browser;
//         this._helper = new Helper(browser);
//     }


//     public openScormSelectPicker(): void {
//         this._browser
//             .useXpath()
//             .waitForElementVisible('//div[contains(@id, "entitiesFor_CourseApps_Scorm_Picker_Entities")]/span[contains(@class, "select-entities")]', Constants.Timeouts.Large)
//             .click('//div[contains(@id, "entitiesFor_CourseApps_Scorm_Picker_Entities")]/span[contains(@class, "select-entities")]', () => {
//                 console.log('Scorm_Picker_Entities is clicked')
//             })
//     }

//     public selectScormOnCourseLayout(scormtitle): void {
//         this._browser
//             .useCss()
//             .waitForElementVisible('iframe.k-content-frame', Constants.Timeouts.Large)
//             .pause(Constants.Timeouts.Medium)
//         this._helper.goToiFrame('iframe.k-content-frame', (frame) => {
//             this._browser
//                 .useXpath()
//                 .moveToElement('//th[contains(@data-field, "Title")]//span[contains(@class, "k-filter")]', 5, 5)
//                 .click('//th[contains(@data-field, "Title")]//span[contains(@class, "k-filter")]')
//                 .waitForElementVisible('//input[contains(@data-bind, "value:filters[0].value")]', Constants.Timeouts.Large)
//                 .clearValue('//input[contains(@data-bind, "value:filters[0].value")]')
//                 .waitForElementVisible('//input[contains(@data-bind, "value:filters[0].value")]', Constants.Timeouts.Large)
//                 .setValue('//input[contains(@data-bind, "value:filters[0].value")]', scormtitle, () => {
//                     this._browser
//                         .useXpath()
//                         .waitForElementVisible('//button[contains(@class, "k-primary")]', Constants.Timeouts.Large)
//                         .click('//button[contains(@class, "k-primary")]')
//                         .waitForElementVisible(`//tr/td[4]/label/span[contains(@class, "switch-handle")]`, Constants.Timeouts.Large)
//                         .click(`//tr/td[4]/label/span[contains(@class, "switch-handle")]`);
//                 });
//         })
//         this._browser
//             .useCss()
//             .waitForElementVisible('input#saveChanges', Constants.Timeouts.Large)
//             .click('input#saveChanges')
//     }

//     public openQuizSelectPicker(): void {
//         this._browser
//             .useXpath()
//             .waitForElementVisible('//div[contains(@id, "entitiesFor_CourseApps_Quiz_Picker_Entities")]/span[contains(@class, "select-entities")]', Constants.Timeouts.Large)
//             .click('//div[contains(@id, "entitiesFor_CourseApps_Quiz_Picker_Entities")]/span[contains(@class, "select-entities")]', () => {
//                 console.log('Quiz_Picker_Entities is clicked ')
//             })
//     }

//     public selectQuizOnCourseLayout(quiztitle): void {
//         this._browser
//             .useCss()
//             .waitForElementVisible('iframe.k-content-frame', Constants.Timeouts.Large);

//         this._helper.goToiFrame('iframe.k-content-frame', (frame) => {
//             this._browser
//                 .useXpath()
//                 .moveToElement('//th[contains(@data-field, "Title")]//span[contains(@class, "k-icon")]', 5, 5)
//                 .click('//th[contains(@data-field, "Title")]//span[contains(@class, "k-icon")]')
//                 .waitForElementVisible('//input[contains(@data-bind, "value:filters[0].value")]', Constants.Timeouts.Large)
//                 .clearValue('//input[contains(@data-bind, "value:filters[0].value")]')
//                 .waitForElementVisible('//input[contains(@data-bind, "value:filters[0].value")]', Constants.Timeouts.Large)
//                 .setValue('//input[contains(@data-bind, "value:filters[0].value")]', quiztitle, () => {
//                     this._browser
//                         .useXpath()
//                         .waitForElementVisible('//button[contains(@class, "k-primary")]', Constants.Timeouts.Large)
//                         .click('//button[contains(@class, "k-primary")]')
//                         .waitForElementVisible(`//tr/td[3]/label/span[contains(@class, "switch-handle")]`, Constants.Timeouts.Large)
//                         .click(`//tr/td[3]/label/span[contains(@class, "switch-handle")]`);
//                 });
//         })
//         this._browser
//             .useCss()
//             .waitForElementVisible('input#save', Constants.Timeouts.Large)
//             .click('input#save')
//     }

//     public openCourseEditForm(): void {
//         this._browser
//             .waitForElementVisible('//i[contains(@data-icon-name, "Edit")]', Constants.Timeouts.Large)
//             .click('//i[contains(@data-icon-name, "Edit")]', ()=>{
//                 console.log(' Edit action is exerted')
//             });
//     }

//     public OpenCourseManagement(): void {
//         this._browser
//             .useXpath()
//             .waitForElementVisible('//a[contains(@class, "calloutCallLink")]', Constants.Timeouts.Huge, true)
//             .click('//a[contains(@class, "calloutCallLink")]', () => {
//                 console.log('Provisioning icon is clicked');
//             })
//             .waitForElementVisible('//span[contains(@class, "icon-ellipsis")]', Constants.Timeouts.Huge, true)
//             .click('//span[contains(@class, "icon-ellipsis")]', () => {
//                 console.log('Elipsis is clicked')
//             })

//     }

//     public ManageLearningModulesOnCourse(): void {
//         this._browser
//             .useXpath()
//             .waitForElementVisible('//a[contains(@href, "LearningPath?")]', Constants.Timeouts.Large)//- press on link in right panel
//             .click('//a[contains(@href, "LearningPath?")]');
//     }

//     public filterByCourseTitle(coursetitle): void {
//         this._browser
//             .useXpath()
//             .waitForElementVisible('//a[contains(@class, "view-course")]', Constants.Timeouts.Huge, true)
//             .moveToElement('//th[contains(@data-field, "CourseName")]//span[contains(@class, "k-icon")]', 5, 5)
//             .click('//th[contains(@data-field, "CourseName")]//span[contains(@class, "k-icon")]', () => {
//                 console.log('Filter icon is clicked')
//             })
//             .waitForElementVisible('//input[contains(@data-bind, "value:filters[0].value")]', Constants.Timeouts.Large)
//             .click('//input[contains(@data-bind, "value:filters[0].value")]')
//             .clearValue('//input[contains(@data-bind, "value:filters[0].value")]')
//             .setValue('//input[contains(@data-bind, "value:filters[0].value")]', coursetitle, () =>{
//                 console.log('Values is set'+ coursetitle)
//             })
//             .waitForElementVisible('//button[contains(@class, "k-primary")]', Constants.Timeouts.Large)
//             .click('//button[contains(@class, "k-primary")]', () => {
//                 console.log('Filter button is clicked')
//             })
//     }

//     public ViewCourse(): void {
//         this._browser
//             .useXpath()
//             .waitForElementVisible('//div[contains(@class, "contentInner_09d1013a")]//span[contains(text(), "View Course")]', Constants.Timeouts.Large)
//             .click('//div[contains(@class, "contentInner_09d1013a")]//span[contains(text(), "View Course")]', () => {
//                 console.log('View course action is exerted')
//             });

//     }

// }