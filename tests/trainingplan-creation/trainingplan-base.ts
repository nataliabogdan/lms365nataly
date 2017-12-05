
import { NightWatchBrowser as Browser } from 'nightwatch';
import { Constants } from '../../infrastructure/constants';
// import { CourseInfo } from './models';
// import { TrainingPlanInfo } from './models';
import { Helper } from '../../infrastructure/helpers/helper';


export class TrainingPlanBase {

    protected readonly _browser: Browser;
    protected readonly _helper: Helper;

    public constructor(browser: Browser) {
        this._browser = browser;
        this._helper = new Helper(browser);
    }


    public selectTrainingPlanCourses(numberCourses?: number): void {
        if (!numberCourses) {
            return;
        }
        this._browser
            .useXpath()
            .waitForElementVisible('//a[contains(@class, "el--select")]', Constants.Timeouts.Large)
            .click('//a[contains(@class, "el--select")]')
            .useCss()
            .waitForElementVisible('iframe.k-content-frame', Constants.Timeouts.Large)
        this._helper.goToiFrame('iframe.k-content-frame', (frame) => {
            this._browser
                .useXpath();
            for (let i = 0; i < numberCourses; i++) {
                this._browser
                    .waitForElementVisible(`//tr[${i + 1}]/td[2]/label/span[contains(@class, "switch-handle")]`, Constants.Timeouts.Large)
                    .click(`//tr[${i + 1}]/td[2]/label/span[contains(@class, "switch-handle")]`)
            }
            this._browser
                .useCss()
                .click('input#save')
        });
        return;
    }

    public goToCreationPageTrainingPlan(): void {
        this._browser
            .useXpath()
            .waitForElementVisible('//span[a[contains(@id, "createCourseLink")]]', Constants.Timeouts.Large)
            .click('//span[a[contains(@id, "createCourseLink")]]')
            .useCss()
            .waitForElementVisible('div.ef--course-create', Constants.Timeouts.Huge, true);
    }
    public OpenTrainingPlanManagement(): void {
        this._browser
            .waitForElementVisible('//a[contains(@class, "calloutCallLink")]', Constants.Timeouts.Huge, true)
            .click('//a[contains(@class, "calloutCallLink")]', () => {
                console.log('Provisioning icon is clicked');
            })
            .waitForElementVisible('//span[contains(@class, "icon-ellipsis")]', Constants.Timeouts.Huge, true)
            .click('//span[contains(@class, "icon-ellipsis")]', () => {
                console.log('Elipsis is clicked')

            })
    }

    public filterTrainingPlan(trainingPlantitle): void {
        this._browser
            .useXpath()
            .waitForElementVisible('//a[contains(@class, "view-course")]', Constants.Timeouts.Huge, true)
            .moveToElement('//th[contains(@data-field, "CourseName")]//span[contains(@class, "k-icon")]', 5, 5)
            .click('//th[contains(@data-field, "CourseName")]//span[contains(@class, "k-icon")]')
            .waitForElementVisible('//input[contains(@data-bind, "value:filters[0].value")]', Constants.Timeouts.Large)
            .click('//input[contains(@data-bind, "value:filters[0].value")]')
            .clearValue('//input[contains(@data-bind, "value:filters[0].value")]')
            .setValue('//input[contains(@data-bind, "value:filters[0].value")]', trainingPlantitle)
            .waitForElementVisible('//button[contains(@class, "k-primary")]', Constants.Timeouts.Large)
            .click('//button[contains(@class, "k-primary")]')
    }

    public openTrainingPlanEditForm(): void {
        this._browser
            .waitForElementVisible('//i[contains(@data-icon-name, "Edit")]', Constants.Timeouts.Huge, true)
            .click('//i[contains(@data-icon-name, "Edit")]', () => {
                console.log('Edit action is exerted')
            })
    }
    public checkTrainingPlanInList(trainingPlanTitle: string): void {
        this.filterTrainingPlan(trainingPlanTitle)
        this._browser.waitForElementVisible(`//tr[td[contains(text(), "${trainingPlanTitle}")]]`, Constants.Timeouts.Medium)
    }

    public openViewLinkForTrainingPlan(): void {
        this._browser
            .useXpath()
            .click('//div[contains(@class, "contentInner_09d1013a")]//span[contains(text(), "View Training Plan")]');
    }
}