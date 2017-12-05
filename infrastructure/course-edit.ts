import { NightWatchBrowser as Browser } from 'nightwatch';
import { Constants } from './constants';
import { CourseInfo } from './models';
import { Helper } from '../infrastructure/helpers/helper'
// import { Models } from '../infrastructure/models'
export class CourseEditor {
    private readonly _browser: Browser;
    protected readonly _helper: Helper;


    public constructor(browser: Browser) {
        this._browser = browser;
        this._helper = new Helper(browser);
    }

    public edit(courseInfo: CourseInfo): CourseEditor {
        if (courseInfo.title) {
            this._browser
                .useCss()
                .clearValue('input#CourseName')
                .setValue('input#CourseName', courseInfo.title);
        }

        if (courseInfo.description) {
            this._browser
                .useCss()
                .setValue('input#Description', courseInfo.description);
        }

        if (courseInfo.category) {
            this._browser
                .useCss()
                .setValue('#token-input-Categories_SelectedItems', courseInfo.category)
                .waitForElementPresent('li.token-input-dropdown-item-sharepoint, li.token-input-dropdown-item2-sharepoint', Constants.Timeouts.Small)
                .keys([this._browser.Keys.ENTER]);
        }

        if (courseInfo.url) {
            this._browser
                .useCss()
                .setValue('input#SiteUrl_RelativeUrl', courseInfo.url);

        }
        if (courseInfo.learners) {
            this._browser
                .useXpath()
                .setValue('//div[2]/ul/li/input[contains(@id, "token-input-Learners_SelectedUsers")]', courseInfo.learners)
                .waitForElementPresent(`//ul/li[span[contains(text(), "${courseInfo.learners}")]]`, Constants.Timeouts.Huge)
                .click(`//ul/li[span[contains(text(), "${courseInfo.learners}")]]`)
        }
        if (courseInfo.selectContentPackage) {

            this.filterContentPackageTitle(courseInfo.selectContentPackage);

        }
        if (courseInfo.selectQuizz) {

            this.filterQuizTitle(courseInfo.selectQuizz);

        }

        this._browser
            .useCss()
            .click('a.--saveCourse')
            .waitForElementPresent('div.courseCreatedLinksBlock', Constants.Timeouts.Huge);

        return this;
    }


    // public OpenCourseEditForm(elearningTitle: string): CourseEditor {
    //     this._browser
    //         .useXpath()
    //         .moveToElement('//th[contains(@data-field, "CourseName")]//span[contains(@class, "k-icon")]', 5, 5)
    //         .click('//th[contains(@data-field, "CourseName")]//span[contains(@class, "k-icon")]')
    //         .waitForElementVisible('//input[contains(@data-bind, "value:filters[0].value")]', Constants.Timeouts.Huge)
    //         .click('//input[contains(@data-bind, "value:filters[0].value")]');
    //     this._helper.setValue('//input[contains(@data-bind, "value:filters[0].value")]', elearningTitle)
    //         .waitForElementVisible('//button[contains(@class, "k-primary")]', Constants.Timeouts.Huge)
    //         .click('//button[contains(@class, "k-primary")]')
    //         .waitForElementVisible('//a[span[contains(@class, "icon-ellipsis")]]', Constants.Timeouts.Huge)
    //         .click('//a[span[contains(@class, "icon-ellipsis")]]')
    //     return this;
    // }

    public editCourseForm(): CourseEditor {
        this._browser
            .waitForElementVisible('//i[contains(@data-icon-name, "Edit")]', Constants.Timeouts.Huge)
            .click('//i[contains(@data-icon-name, "Edit")]');
        return this;
    }


    public filterContentPackageTitle(scormLM): void {

        this._browser
            .useXpath()
            .click('//div[contains(@id, "entitiesFor_CourseApps_Scorm_Picker_Entities")]/span[contains(@class, "select-entities")]')
            .useCss()
            .waitForElementPresent('iframe.k-content-frame', Constants.Timeouts.Huge);

        this._helper.goToiFrame('iframe.k-content-frame', (frame) => {
            this._browser
                .useXpath()
                .moveToElement('//th[contains(@data-field, "Title")]//span[contains(@class, "k-icon")]', 5, 5)
                .click('//th[contains(@data-field, "Title")]//span[contains(@class, "k-icon")]')
                .clearValue('//input[contains(@data-bind, "value:filters[0].value")]')
                .setValue('//input[contains(@data-bind, "value:filters[0].value")]', scormLM, () => {
                    this._browser
                        .useXpath()
                        .waitForElementVisible('//button[contains(@class, "k-primary")]', Constants.Timeouts.Huge)
                        .click('//button[contains(@class, "k-primary")]')
                        .waitForElementPresent(`//tr/td[4]/label/span[contains(@class, "switch-handle")]`, Constants.Timeouts.Huge)
                        .click(`//tr/td[4]/label/span[contains(@class, "switch-handle")]`);
                });
        })
        this._browser
            .useCss()
            .waitForElementVisible('input#saveChanges', Constants.Timeouts.Huge)
            .click('input#saveChanges')
    }

    public filterQuizTitle(quizLM): void {

        this._browser
            .useXpath()
            .click('//div[contains(@id, "entitiesFor_CourseApps_Scorm_Picker_Entities")]/span[contains(@class, "select-entities")]')
            .useCss()
            .waitForElementPresent('iframe.k-content-frame', Constants.Timeouts.Huge);

        this._helper.goToiFrame('iframe.k-content-frame', (frame) => {
            this._browser
                .useXpath()
                .moveToElement('//th[contains(@data-field, "Title")]//span[contains(@class, "k-icon")]', 5, 5)
                .click('//th[contains(@data-field, "Title")]//span[contains(@class, "k-icon")]')
                .clearValue('//input[contains(@data-bind, "value:filters[0].value")]')
                .setValue('//input[contains(@data-bind, "value:filters[0].value")]', quizLM, () => {
                    this._browser
                        .useXpath()
                        .waitForElementVisible('//button[contains(@class, "k-primary")]', Constants.Timeouts.Huge)
                        .click('//button[contains(@class, "k-primary")]')
                        .waitForElementPresent(`//tr/td[3]/label/span[contains(@class, "switch-handle")]`, Constants.Timeouts.Huge)
                        .click(`//tr/td[3]/label/span[contains(@class, "switch-handle")]`);
                });
        })
        this._browser
            .useCss()
            .waitForElementVisible('input#saveChanges', Constants.Timeouts.Huge)
            .click('input#saveChanges')
    }

    public filterByCourseTitle(coursetitle): void {
        this._browser
            .useXpath()
            .waitForElementVisible('//a[contains(@class, "view-course")]', Constants.Timeouts.Huge, true)
            .moveToElement('//th[contains(@data-field, "CourseName")]//span[contains(@class, "k-icon")]', 5, 5)
            .click('//th[contains(@data-field, "CourseName")]//span[contains(@class, "k-icon")]', () => {
                console.log('Filter icon is clicked')
            })
            .waitForElementVisible('//input[contains(@data-bind, "value:filters[0].value")]', Constants.Timeouts.Huge)
            .click('//input[contains(@data-bind, "value:filters[0].value")]')
            .clearValue('//input[contains(@data-bind, "value:filters[0].value")]')
            .setValue('//input[contains(@data-bind, "value:filters[0].value")]', coursetitle, () =>{
                console.log('Values is set'+ coursetitle)
            })
            .waitForElementVisible('//button[contains(@class, "k-primary")]', Constants.Timeouts.Huge)
            .click('//button[contains(@class, "k-primary")]', () => {
                console.log('Filter button is clicked')
            })
    }

    public OpenCourseManagement(): void {
        this._browser
            .useXpath()
            .waitForElementVisible('//a[contains(@class, "calloutCallLink")]', Constants.Timeouts.Huge, true)
            .click('//a[contains(@class, "calloutCallLink")]', () => {
                console.log('Provisioning icon is clicked');
            })
            .waitForElementVisible('//span[contains(@class, "icon-ellipsis")]', Constants.Timeouts.Huge, true)
            .click('//span[contains(@class, "icon-ellipsis")]', () => {
                console.log('Elipsis is clicked')
            })

    }

    public ManageLearningModulesOnCourse(): void {
        this._browser
            .useXpath()
            .waitForElementVisible('//a[contains(@href, "LearningPath?")]', Constants.Timeouts.Huge)//- press on link in right panel
            .click('//a[contains(@href, "LearningPath?")]', () => {
                console.log('Manage Learning Module on Course action is exerted')
            });
    }
}
