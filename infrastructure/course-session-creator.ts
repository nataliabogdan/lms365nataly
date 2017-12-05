import { NightWatchBrowser as Browser } from 'nightwatch';
import { Constants } from './constants';
import { CourseSessionInfo } from './models';

export class CourseSessionCreator {
    private readonly _browser: Browser;

    public constructor(browser: Browser) {
        this._browser = browser;
    }

    public create(courseSessionInfo: CourseSessionInfo): CourseSessionCreator {
        if (courseSessionInfo.room) {
            this._browser
                .useCss()
                .waitForElementVisible('input#token-input-Room_SelectedItems', Constants.Timeouts.Huge, true)
                .clearValue('input#token-input-Room_SelectedItems')
                .setValue('input#token-input-Room_SelectedItems', courseSessionInfo.room, () =>{
                    console.log('Room title is set in room field')
                })
                .waitForElementVisible('li.token-input-dropdown-item-sharepoint, li.token-input-dropdown-item2-sharepoint', Constants.Timeouts.Huge, true)
                .keys([this._browser.Keys.ENTER]);
        }

        if (courseSessionInfo.attendees) {
            this._browser
                .useCss()
                .waitForElementVisible('input#MaximumAttendees', Constants.Timeouts.Huge, true)
                .clearValue('input#MaximumAttendees', () => {
                    console.log('All possible values are cleared from attendees field')
                })
                .setValue('input#MaximumAttendees', courseSessionInfo.attendees, () => {
                    console.log('Atendees are set to 5')
                });
        }

        if (courseSessionInfo.learners) {
            this._browser
                .useXpath()
                .setValue('//input[contains(@id, "token-input-Learners_SelectedUsers")]', courseSessionInfo.learners, () =>{
                    console.log('Learner name is set in learners field')
                })
                .waitForElementPresent(`//ul/li[span[contains(text(), "${courseSessionInfo.learners}")]]`, Constants.Timeouts.Huge)
                .click(`//ul/li[span[contains(text(), "${courseSessionInfo.learners}")]]`, () => {
                    console.log('Select Learner dropdown is clicked')
                })
        }

        if (courseSessionInfo.meetingUrl) {
            this._browser
                .useXpath()
                .waitForElementVisible('//input[contains(@id, "MeetingUrl")]', Constants.Timeouts.Huge, true)
                .setValue('//input[contains(@id, "MeetingUrl")]', courseSessionInfo.meetingUrl, () =>{
                console.log('Meeting Url is inserted')
                })
        }
        this._browser
            .useCss()
            .waitForElementVisible('a.--saveCourse', Constants.Timeouts.Huge, true)
            .click('a.--saveCourse', () => {
                console.log('Create Course Session is clicked')
            });
        this._browser.waitForElementVisible('div#course-session-list-grid', Constants.Timeouts.Huge, true);
        return this;
    }


    public goToSessionCreationPage(): CourseSessionCreator {
        this._browser
            .useXpath()
            .waitForElementVisible('//a[contains(@href,"Catalog/CourseSessions/Create")]', Constants.Timeouts.Huge, true)
            .click('//a[contains(@href,"Catalog/CourseSessions/Create")]', () => {
                console.log('Clicked Course Sessions Create')
            })
            .waitForElementVisible('//div[@class="course-create-container"]', Constants.Timeouts.Huge, true);
        return this;
    }

    public goToManageSession(): void {
        this._browser
            .useXpath()
            .waitForElementVisible('//div[contains(@class,"contentInner_52f49f74")]//i[@data-icon-name="Calendar"]', Constants.Timeouts.Huge, true)
            .click('//div[contains(@class,"contentInner_52f49f74")]//i[@data-icon-name="Calendar"]', () => {
                console.log('Manage Session is clicked');
            })
            .waitForElementVisible('//div[@id="course-session-list-grid"]', Constants.Timeouts.Huge, true)
    }

}


