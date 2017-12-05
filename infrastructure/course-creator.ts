import { NightWatchBrowser as Browser } from 'nightwatch';
import { Constants } from './constants';
import { CourseInfo } from './models';
import { Helper } from '../infrastructure/helpers/helper'
declare const WORKING_PATH: string;

export class CourseCreator {
    private readonly _browser: Browser;
    protected readonly _helper: Helper;

    public constructor(browser: Browser) {
        this._browser = browser;
        this._helper = new Helper(browser);
    }

    public create(courseInfo: CourseInfo): CourseCreator {
        if (courseInfo.title) {
            this._browser.setValue('input#CourseName', courseInfo.title);
        }

        if (courseInfo.description) {
            this._browser.setValue('input#Description', courseInfo.description);
        }

        if (courseInfo.category) {
            this._browser
                .setValue('#token-input-Categories_SelectedItems', courseInfo.category)
                .waitForElementPresent('li.token-input-dropdown-item-sharepoint, li.token-input-dropdown-item2-sharepoint', Constants.Timeouts.Huge, true)
                .keys([this._browser.Keys.ENTER]);
        }

        if (courseInfo.url) {
            this._browser.setValue('input#SiteUrl_RelativeUrl', courseInfo.url);
        }

        if (courseInfo.learners) {
            this._browser
                .useXpath()
                .setValue('//div[2]/ul/li/input[contains(@id, "token-input-Learners_SelectedUsers")]', courseInfo.learners)
                .waitForElementPresent('//div[12]/ul/li[span[contains(text(), "Alex Mikado")]]', Constants.Timeouts.Huge)
                .click('//div[12]/ul/li[span[contains(text(), "Alex Mikado")]]')
        }
        if (courseInfo.selectContentPackage) {

            this.filterContentPackageTitle(courseInfo.selectContentPackage);

        }
        if (courseInfo.selectQuizz) {

            this.filterQuizTitle(courseInfo.selectQuizz);

        }

        this._browser.useCss()
        this._browser.click('a.--saveCourse')
            .waitForElementPresent('div.courseCreatedLinksBlock', Constants.Timeouts.Huge, true)

        return this;
    }

    public goToCreationPageWebinar(): CourseCreator {
        this._browser
            .useCss()
            .click('a#createCourseLink')
            .click('.calloutItemLink:nth-child(3)', () => {
                console.log('Webinar Course type is selected in Create Course Callout')
            })
            .waitForElementPresent('div.ef--course-create', Constants.Timeouts.Huge, true);

        return this;
    }

    public goToCreationPageClassroom(): CourseCreator {
        this._browser
            .useCss()
            .click('a#createCourseLink')
            .click('.calloutItemLink:nth-child(2)', () => {
                console.log('Classroom Course type is selected in Create Course Callout')
            })
            .waitForElementVisible('div.ef--course-create', Constants.Timeouts.Huge, true);

        return this;
    }


    public goToCreationPageElearning(): CourseCreator {
        this._browser
            .click('a#createCourseLink', () => {
                console.log('Create Course link is clicked')
            })
            .click('.calloutItemLink:nth-child(1)', () => {
                console.log('eLearning Course type is selected in Create Course Callout')
            })
            .waitForElementVisible('div.ef--course-create', Constants.Timeouts.Huge, true);
            // if 
            // .waitForElementPresent(('div.course-create-container', Constants.Timeouts.Huge, false)
            
            //     this._browser.waitForElementVisible ('', Constants.Timeouts.Huge, true)
            // }

        return this;
        }
    // }
    // public goToCreationPageElearningNew(): CourseCreator {
    //     this._browser
    //         .click('a#createCourseLink', () => {
    //             console.log('Create Course link is clicked')
    //         })
    //         .click('.calloutItemLink:nth-child(1)', () => {
    //             console.log('eLearning Course type is selected in Create Course Callout')
    //         })
    //         .waitForElementPresent('div.ef--course-create', Constants.Timeouts.Huge, true);

    //     return this;
    // }



    // public LearnersDetails(coursetitle: string): CourseCreator {
    //     this._browser
    //         .useXpath()
    //         .click('//i[contains(@data-icon-name, "BarChart4")]')
    //     return this;
    // }

    // public ViewCourse(coursetitle: string): CourseCreator {
    //     this._browser
    //         .useXpath()
    //         .click('//i[contains(@data-icon-name, "RedEye")]')
    //     return this;
    // }





    public makeScreenshotForElearningWithApps(): CourseCreator {
        this._browser
            .useXpath()
            .waitForElementPresent('//div[h3[contains(@class, "ef-card-title ms-TileText-fontColor")]]', Constants.Timeouts.Huge)
            .waitForElementPresent('//div[h3[contains(text(),"Course Description")]]', Constants.Timeouts.Huge)
            .waitForElementPresent('//div[h3[contains(text(),"Learning Modules")]]', Constants.Timeouts.Huge)
            .waitForElementPresent('//div[h3[contains(text(),"My Assignments")]]', Constants.Timeouts.Huge)
            .waitForElementPresent('//div[h3[contains(text(),"Course Information")]]', Constants.Timeouts.Huge)
            .pause(5000)
            .saveScreenshot(`${WORKING_PATH}/files/Screenshots/WebpartsOnElearningCoursePageWithAllApps.png`);

        return this;
    }


    public makeScreenshotForElearningWitouthApps(): CourseCreator {
        this._browser
            .useXpath()
            .waitForElementPresent('//div[h3[contains(@class, "ef-card-title ms-TileText-fontColor")]]', Constants.Timeouts.Huge)
            .waitForElementPresent('//div[h3[contains(text(),"Course Description")]]', Constants.Timeouts.Huge)
            .waitForElementPresent('//div[h3[contains(text(),"Self Completion")]]', Constants.Timeouts.Huge)
            .waitForElementPresent('//div[h3[contains(text(),"Course Information")]]', Constants.Timeouts.Huge)
            .pause(5000)
            .saveScreenshot(`${WORKING_PATH}/files/Screenshots/WebpartsOnElearningCoursePageWithoutApps.png`);

        return this;
    }

    public makeScreenshotForClassroom(): CourseCreator {
        this._browser
            .useXpath()
            .waitForElementPresent('//div[h3[contains(@class, "ef-card-title ms-TileText-fontColor")]]', Constants.Timeouts.Huge)
            .waitForElementPresent('//div[h3[contains(text(),"Course Description")]]', Constants.Timeouts.Huge)
            .waitForElementPresent('//div[h3[contains(text(),"Course Sessions")]]', Constants.Timeouts.Huge)
            .waitForElementPresent('//div[h3[contains(text(),"Course Information")]]', Constants.Timeouts.Huge)
            .pause(5000)
            .saveScreenshot(`${WORKING_PATH}/files/Screenshots/WebpartsOnClassroomCourse.png`);

        return this;
    }

    public makeScreenshotForTrainingPlan(): CourseCreator {
        this._browser
            .useXpath()
            .waitForElementPresent('//div[h3[contains(@class, "ef-card-title ms-TileText-fontColor")]]', Constants.Timeouts.Huge)
            .waitForElementPresent('//div[h3[contains(text(),"Course Description")]]', Constants.Timeouts.Huge)
            .waitForElementPresent('//div[h3[contains(text(),"Course Sessions")]]', Constants.Timeouts.Huge)
            .waitForElementPresent('//div[h3[contains(text(),"Course Information")]]', Constants.Timeouts.Huge)
            .pause(5000)
            .saveScreenshot(`${WORKING_PATH}/files/Screenshots/WebpartsOnClassroomCourse.png`);

        return this;
    }

    public openAllTabsInDashboard(): CourseCreator {
        // this
        // .waitListIsLoaded()
        this.goToTheNextTab();
        return this;
    }

    public openTeamViewInDashboard(): CourseCreator {
        this.openTeamView()
        this.downloadDocument()
        this.expandUser()
        this._browser.saveScreenshot(`${WORKING_PATH}/files/Screenshots/Dashboard/ExpandSubordinate.png`)
        this.sortingUser()
        return this;
    }


    // public waitListIsLoaded(): CourseCreator {
    //     this._browser
    //         .useCss()
    //         .waitForElementPresent('#lms365 div.k-grid.k-widget table', Constants.Timeouts.Huge)
    //         .moveToElement('#lms365 div.k-grid.k-widget table', 50, 50)
    //     return this;
    // }

    public goToTheNextTab(): CourseCreator {
        let that = this;
        this._browser
            .useXpath()
            .waitForElementPresent('//ul[contains(@class, "k-tabstrip-items k-reset")]', Constants.Timeouts.Large)
            .elements('xpath', '//ul[contains(@class, "k-tabstrip-items k-reset")]/li', function (result) {
                console.log('Count of TABS is ' + result.value.length)
                for (let i = 0; i < result.value.length; i++) {
                    that._browser.useXpath().waitForElementPresent(`//div[@class="--efLms365Dashboard"]//ul/li[${i + 1}]`, Constants.Timeouts.Large)
                    that._browser.element('xpath', `//div[contains(@class, "k-grid k-widget")]`, function (result) {
                        if (result.value && result.value.ELEMENT) {
                            console.log('this is PLAIN tab')
                            that._browser.waitForElementVisible('//div[contains(@class, "k-grid k-widget")]//tbody', Constants.Timeouts.Large)
                            that._browser.saveScreenshot(`${WORKING_PATH}/files/Screenshots/Dashboard/Dashboard${i + 1}Tab.png`)
                            that._browser.useXpath().click(`//div[@class="--efLms365Dashboard"]//ul/li[${i + 1}]`)
                        }
                    }),
                    that._browser.useXpath().element('xpath', `//div[contains(@class, "leaderboardHeader")]`, function (result) {
                        if (result.value && result.value.ELEMENT) {
                            console.log('this is leaderboard tab')
                            that._browser.waitForElementVisible('//div[contains(@class, "listview-item")]', Constants.Timeouts.Large)
                            that._browser.saveScreenshot(`${WORKING_PATH}/files/Screenshots/Dashboard/Dashboard${i + 1}Tab.png`)
                            that._browser.useXpath().click(`//div[@class="--efLms365Dashboard"]//ul/li[${i + 1}]`)
                        }
                    }),
                    that._browser.useXpath().element('xpath', `//div[contains(@class, "transcriptHeader")]`, function (result) {
                        if (result.value && result.value.ELEMENT) {
                            console.log('this is transcrip tab')
                            that._browser.waitForElementVisible('//div[contains(@class, "transcriptInfo")]', Constants.Timeouts.Large)
                            that._browser.saveScreenshot(`${WORKING_PATH}/files/Screenshots/Dashboard/Dashboard${i + 1}Tab.png`)
                            that.downloadDocument()
                            that._browser.useXpath().click(`//div[@class="--efLms365Dashboard"]//ul/li[${i + 1}]`)
                        }
                    })
                }
            })
        return this;
    }

    public openTeamView(): CourseCreator {
        this._browser
            .useXpath()
            .waitForElementVisible('//a[span[contains(@class, "icon-usergroup")]]', Constants.Timeouts.Large)
            .click('//a[span[contains(@class, "icon-usergroup")]]')
            .waitForElementPresent('//div[contains(@class, "teamviewGridContainer")]//tbody/tr', Constants.Timeouts.Large)
        return this;
    }

    private downloadDocument(): CourseCreator {
        this._browser
        .useXpath()
        .waitForElementPresent('//button[contains(@class, "k-button")]', Constants.Timeouts.Large)
        .click('//button[contains(@class, "k-button")]')
        .pause(3000)


        return this;
    }

    private expandUser(): CourseCreator {
        this._browser
        .useXpath().waitForElementVisible('//a[@class="k-icon k-plus"]', Constants.Timeouts.Large)
        .click('//a[@class="k-icon k-plus"]')
        return this;
    }

    private sortingUser(): CourseCreator {
        this._browser
        .useXpath()
        .waitForElementVisible('//span[contains(@aria-owns, "user_listbox")]//span[contains(@class, "k-select")]', Constants.Timeouts.Large)
        .click('//span[contains(@aria-owns, "user_listbox")]//span[contains(@class, "k-select")]')
        .waitForElementVisible('//div[contains(@class, "k-list-scroller")]//li[1]/input', Constants.Timeouts.Large)
        .click('//div[contains(@class, "k-list-scroller")]//li[1]/input')
        .click('//div[contains(@id, "contentRow")]')
        .pause(3000)
        return this;
    }

    public editPage(): CourseCreator {
        this._browser
            .useXpath()
            .waitForElementPresent('//div[button[contains(@id, "O365_MainLink_Settings")]]', Constants.Timeouts.Huge)
            .click('//div[button[contains(@id, "O365_MainLink_Settings")]]')
            .waitForElementPresent('//a[contains(@id, "O365_SubLink_SuiteMenu_ctl00_SiteActionsMenuMainData_ctl00_MenuItem_EditPage")]', Constants.Timeouts.Huge)
            .click('//a[contains(@id, "O365_SubLink_SuiteMenu_ctl00_SiteActionsMenuMainData_ctl00_MenuItem_EditPage")]')
            .waitForElementVisible("//div[contains(@class, 'ms-rte-layoutszone-inner-editable')]", Constants.Timeouts.Huge)
            .useCss().waitForElementPresent('#lms365 div.k-grid.k-widget table', Constants.Timeouts.Huge)
        return this;
    }

    public initEditDashboardWebPart(): CourseCreator {
        this._browser
            .useXpath()
            .waitForElementPresent('//div[a[span[contains(@class, "icon-cog")]]]', Constants.Timeouts.Huge)
            .click('//div[a[span[contains(@class, "icon-cog")]]]')
            .waitForElementPresent('//div[ul[contains(@class, "fieldlist")]]', Constants.Timeouts.Huge)
        return this;
    }

    public initAddColumnDashboardTab(): CourseCreator {
        this._browser
            .useXpath()
            .waitForElementVisible('//a[span[contains(@class, "k-i-custom")]]', Constants.Timeouts.Huge)
            .pause(2000)
            .click('//a[span[contains(@class, "k-i-custom")]]')
            .waitForElementVisible('//div[ul[contains(@class, "fieldlist")]]', Constants.Timeouts.Huge)
        return this;
    }

    public enableDashboardTabs(): CourseCreator {
        let that = this;
        this._browser
            .useXpath()
            .waitForElementPresent('//div/div/ul[contains(@class, "fieldlist")]/li', Constants.Timeouts.Huge)
            .elements('xpath', '//div/div/ul[contains(@class, "fieldlist")]/li', function (result) {
                console.log('Count is ' + result.value.length)
                for (let i = 0; i < result.value.length; i++) {
                    that._browser.useXpath().waitForElementPresent(`//div/div/ul[contains(@class, "fieldlist")]/li[${i + 1}]/label[@class = "k-checkbox-label"]`, Constants.Timeouts.Huge)
                    // enable all unchecked tabs
                    that._browser.element('xpath', `//div/div/ul[contains(@class, "fieldlist")]/li[${i + 1}]/input[@class = "k-checkbox"]`, (response) => {
                        that._browser.elementIdSelected(response.value.ELEMENT, (result) => {
                            if (result.value == false) {
                                that._browser.useXpath().click(`//div/div/ul[contains(@class, "fieldlist")]/li[${i + 1}]/label[@class = "k-checkbox-label"]`);
                            };
                        });
                    });
                }
                that._browser.useXpath().waitForElementPresent('//div[a[span[contains(@class, "icon-text")]]]', Constants.Timeouts.Huge)
                    .click('//div[a[span[contains(@class, "icon-text")]]]')
            }
            );
        return this;
    }


    public addDashboardColumns(): CourseCreator {
        let that = this;
        this._browser
            .useXpath()
            .waitForElementPresent('//div/div/ul[contains(@class, "fieldlist")]/li', Constants.Timeouts.Huge)
            .elements('xpath', '//li[contains(@draggable, "true")]/label[@class = "k-checkbox-label"]', function (result) {
                console.log('Count is ' + result.value.length)
                for (let i = 0; i < result.value.length; i++) {
                    that._browser.useXpath().waitForElementPresent(`//li[contains(@draggable, "true")][${i + 1}]/label[@class = "k-checkbox-label"]`, Constants.Timeouts.Huge)
                    // enable all unchecked tabs
                    that._browser.element('xpath', `//li[contains(@draggable, "true")][${i + 1}]/input[@class = "k-checkbox"]`, (response) => {
                        that._browser.elementIdSelected(response.value.ELEMENT, (result) => {
                            if (result.value == false) {
                                that._browser.useXpath().click(`//li[contains(@draggable, "true")][${i + 1}]/label[@class = "k-checkbox-label"]`);
                            };

                        });
                    });
                }
                that._browser.useXpath().waitForElementPresent('//a[span[contains(@class, "icon-apply")]]', Constants.Timeouts.Huge)
                    .click('//a[span[contains(@class, "icon-apply")]]')
            }
            );
        return this;
    }

    public editTitleDashboardColumns(): CourseCreator {
        let that = this;
        this._browser
            .useXpath()
            .waitForElementPresent('//div/div/ul[contains(@class, "fieldlist")]/li', Constants.Timeouts.Huge)
            .elements('xpath', '//li[contains(@draggable, "true")]/label[@class = "k-checkbox-label"]', function (result) {
                console.log('Count is ' + result.value.length)
                for (let i = 0; i < result.value.length; i++) {
                    that._browser.useXpath().waitForElementPresent(`//li[contains(@draggable, "true")][${i + 1}]/label[@class = "k-checkbox-label"]`, Constants.Timeouts.Huge)
                    // edit title of all checked columns
                    that._browser.element('xpath', `//li[contains(@draggable, "true")][${i + 1}]/input[@class = "k-checkbox"]`, (response) => {
                        that._browser.elementIdSelected(response.value.ELEMENT, (result) => {
                            if (result.value == true) {
                                that._browser.useXpath().setValue(`//li[contains(@draggable, "true")][${i + 1}]/input[contains(@type, "text")]`, `_C${i + 1}`)
                            };

                        });
                    });
                }
                that._browser.useXpath().waitForElementPresent('//a[span[contains(@class, "icon-apply")]]', Constants.Timeouts.Huge)
                    .click('//a[span[contains(@class, "icon-apply")]]')
            }
            );
        return this;
    }

    public deleteDashboardColumns(): CourseCreator {
        let that = this;
        this._browser
            .useXpath()
            .waitForElementPresent('//div/div/ul[contains(@class, "fieldlist")]/li', Constants.Timeouts.Huge)
            .elements('xpath', '//li[contains(@draggable, "true")]/label[@class = "k-checkbox-label"]', function (result) {
                console.log('Count is ' + result.value.length)
                for (let i = 0; i < result.value.length; i++) {
                    that._browser.useXpath().waitForElementPresent(`//li[contains(@draggable, "true")][${i + 1}]/input[@class = "k-checkbox"]`, Constants.Timeouts.Huge)
                    // enable all unchecked columns
                    that._browser.element('xpath', `//li[contains(@draggable, "true")][1]/input[@class = "k-checkbox"]`, (response) => {
                        that._browser.elementIdSelected(response.value.ELEMENT, (result) => {
                            if (result.value == true) {
                                that._browser.useXpath().click(`//li[contains(@draggable, "true")][1]/label[@class = "k-checkbox-label"]`)
                                console.log('Count of unchecked columns' + `${i + 1}`)
                            };
                        });
                    });
                }
                that._browser.useXpath().waitForElementPresent('//a[span[contains(@class, "icon-apply")]]', Constants.Timeouts.Huge)
                    .click('//a[span[contains(@class, "icon-apply")]]')
            }
            );
        return this;
    }


    public savePage(): CourseCreator {
        this._browser
            .useXpath().waitForElementVisible('//span[contains(@id, "Ribbon.EditingTools.CPEditTab.EditAndCheckout.SaveEdit-Large")]//a[contains(@class, "ms-cui-ctl-large")]', Constants.Timeouts.Huge)
            .click('//span[contains(@id, "Ribbon.EditingTools.CPEditTab.EditAndCheckout.SaveEdit-Large")]//a[contains(@class, "ms-cui-ctl-large")]')
        return this;
    }

    public filterContentPackageTitle(scormLM): void {

        this._browser
            .useXpath()
            .waitForElementVisible('//a[contains(@apptype, "Scorm")]', Constants.Timeouts.Huge)
            .click('//a[contains(@apptype, "Scorm")]')
            .useCss()
            .waitForElementVisible('iframe.k-content-frame', Constants.Timeouts.Huge)
            .pause(Constants.Timeouts.Medium)
        this._helper.goToiFrame('iframe.k-content-frame', (frame) => {
            this._browser
                .useXpath()
                .moveToElement('//th[contains(@data-field, "Title")]//span[contains(@class, "k-filter")]', 5, 5)
                .click('//th[contains(@data-field, "Title")]//span[contains(@class, "k-filter")]')
                .waitForElementVisible('//input[contains(@data-bind, "value:filters[0].value")]', Constants.Timeouts.Huge)
                .clearValue('//input[contains(@data-bind, "value:filters[0].value")]')
                .waitForElementVisible('//input[contains(@data-bind, "value:filters[0].value")]', Constants.Timeouts.Huge)
                .setValue('//input[contains(@data-bind, "value:filters[0].value")]', scormLM, () => {
                    this._browser
                        .useXpath()
                        .waitForElementVisible('//button[contains(@class, "k-primary")]', Constants.Timeouts.Huge)
                        .click('//button[contains(@class, "k-primary")]')
                        .waitForElementVisible(`//tr/td[4]/label/span[contains(@class, "switch-handle")]`, Constants.Timeouts.Huge)
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
            .waitForElementVisible('//a[contains(@apptype, "Quiz")]', Constants.Timeouts.Huge)
            .click('//a[contains(@apptype, "Quiz")]')
            .useCss() 
            .waitForElementVisible('iframe.k-content-frame', Constants.Timeouts.Huge);

        this._helper.goToiFrame('iframe.k-content-frame', (frame) => {
            this._browser
                .useXpath()
                .moveToElement('//th[contains(@data-field, "Title")]//span[contains(@class, "k-icon")]', 5, 5)
                .click('//th[contains(@data-field, "Title")]//span[contains(@class, "k-icon")]')
                .waitForElementVisible('//input[contains(@data-bind, "value:filters[0].value")]', Constants.Timeouts.Huge)                
                .clearValue('//input[contains(@data-bind, "value:filters[0].value")]')
                .waitForElementVisible('//input[contains(@data-bind, "value:filters[0].value")]', Constants.Timeouts.Huge)                
                .setValue('//input[contains(@data-bind, "value:filters[0].value")]', quizLM, () => {
                    this._browser
                        .useXpath()
                        .waitForElementVisible('//button[contains(@class, "k-primary")]', Constants.Timeouts.Huge)
                        .click('//button[contains(@class, "k-primary")]')
                        .waitForElementVisible(`//tr/td[3]/label/span[contains(@class, "switch-handle")]`, Constants.Timeouts.Huge)
                        .click(`//tr/td[3]/label/span[contains(@class, "switch-handle")]`);
                });
        })
        this._browser
            .useCss()
            .waitForElementVisible('input#save', Constants.Timeouts.Huge)
            .click('input#save')
    }
}
