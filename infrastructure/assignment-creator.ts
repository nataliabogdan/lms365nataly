import { NightWatchBrowser as Browser } from 'nightwatch';
import { Constants } from './constants';
import { AssignmentFields } from './models';
import { Helper } from './helpers/helper';

export class AssignmentCreator {
    private readonly _browser: Browser;
    private readonly _helper: Helper;

    public constructor(browser: Browser) {
        this._browser = browser;
        this._helper = new Helper(browser);
    }

    public create(assignmentFields: AssignmentFields): AssignmentCreator {

        if (assignmentFields) {
            this._helper.goToiFrame('.k-content-frame', (frame) => {
                
                if (assignmentFields.description) {
                    this._helper.goToiFrame('.k-content', (frame) => {
                        this._browser.pause(Constants.Timeouts.Small);
                        this._helper.setValue('html>body', assignmentFields.description);
                        this._browser.frameParent();
                    });
                }
                this._helper.setValue('#Title', assignmentFields.title);
                if (assignmentFields.uploads_to_description) {
                    assignmentFields.uploads_to_description.map(x => this._helper.uploadFilesToKendo(x));
                }
                if (assignmentFields.upload_file) {
                    this._browser
                        .click('a.file-btn.main-file-btn.file-link.upload-link.ms-heroCommandLink') // attach file button
                        .waitForElementPresent('.file.ms-long.ms-spellcheck-true', Constants.Timeouts.Medium)
                    this._helper.setValue('input.file.ms-long.ms-spellcheck-true', assignmentFields.upload_file) //upload file
                        .pause(1000)
                        .click('.ms-ButtonHeightWidth.upload.close-dialog'); //ok button
                }
                if (assignmentFields.tag) {
                    this._browser.waitForElementVisible('input#Tags', Constants.Timeouts.Medium)
                    this._helper.setValue('input#Tags', assignmentFields.tag);
                }
                /*this._browser.clearValue('#OpenDate');
                this._browser.clearValue('#DueDate');
                if (assignmentFields.open_date != null) {
                    this._browser.setValue('input#OpenDate', `${assignmentFields.open_date}`)
                }
                if (assignmentFields.due_date != null) {
                    this._browser.setValue('input#DueDate', `${assignmentFields.due_date}`)
                }*/
                if ((assignmentFields.open_date == null) && (assignmentFields.due_date == null)) {
                    this._browser.clearValue('#OpenDate');
                    this._browser.clearValue('#DueDate');
                }
                this._browser.pause(1000);
                this._browser.waitForElementVisible('a.f-btn.submit-link.ms-heroCommandLink', Constants.Timeouts.Medium);
                this._browser.click('a.f-btn.submit-link.ms-heroCommandLink'); //save assignment               
            })
        }
        return this;
    }

    public goToCreationPage(): AssignmentCreator {  //create assignment
        this._browser
            .click('a#newAssignment')
            .waitForElementPresent('#editItemIframe', Constants.Timeouts.Medium)
        return this;
    }

    public goToEditingPage(assignment): AssignmentCreator {  //edit assignment
        this._browser
            .useXpath().click(`//tr[td[contains(text(),"${assignment}")]]//a[@class='edit-assignment row-edit-link ms-heroCommandLink']`)
            .useCss().waitForElementPresent('#editItemIframe', Constants.Timeouts.Medium)
        return this;
    }

    public deleteAssignment(assignment): AssignmentCreator {  //delete assignment
        this._browser
            .useXpath().click(`//tr[td[contains(text(),"${assignment}")]]//a[@class='delete-row ms-heroCommandLink']`)
            .useCss()
            .acceptAlert()            
            .waitForElementVisible('table#assignmentsList', Constants.Timeouts.Large);            
        return this;
    }
    public editAssignment(assignment): AssignmentCreator {  //edit assignment task by learner
        this._browser
            .useXpath()
            .waitForElementVisible(`//tr[td[contains(text(),"${assignment}")]]//a[@class='row-edit-link ms-heroCommandLink']`, Constants.Timeouts.Large)
            .click(`//tr[td[contains(text(),"${assignment}")]]//a[@class='row-edit-link ms-heroCommandLink']`)
            .useCss().waitForElementVisible('#editItemIframe', Constants.Timeouts.Medium)
        return this;
    }

    public viewAssignment(assignment): AssignmentCreator {  //view assignment's tasks by admin
        this._browser
            .useXpath()
            .waitForElementVisible(`//tr[td[contains(text(),"${assignment}")]]//a[@class='ms-heroCommandLink row-view-link']`, Constants.Timeouts.Large)
            .click(`//tr[td[contains(text(),"${assignment}")]]//a[@class='ms-heroCommandLink row-view-link']`)
            .useCss().waitForElementPresent('.assignmentsList', Constants.Timeouts.Medium)
        return this;
    }
    public editAssignmentTask(userName): AssignmentCreator {  //edit assignment task by admin
        this._browser
            .useXpath().click(`//tr[td[contains(text(),"${userName}")]]//a[@class="edit-assignment-task ms-heroCommandLink"]`)
            .useCss().waitForElementPresent('iframe.k-content-frame', Constants.Timeouts.Medium)
        return this;
    }

    public submitAssignmentTask(comments): AssignmentCreator {  //submit assignment task by learner
        this._helper.goToiFrame('.k-content-frame', (frame) => {
            this._helper
                .setValue('.form-control.comment.text-box.multi-line', comments)
                .waitForElementVisible('a.f-btn.submit-link.ms-heroCommandLink[data-value="Submit"]', Constants.Timeouts.Large)
                .click('a.f-btn.submit-link.ms-heroCommandLink[data-value="Submit"]')
                .frameParent();
        })
        this._browser.waitForElementVisible('.assignmentsList', Constants.Timeouts.Large)
        return this;
    }

    public approveAssignmentTask(comments): AssignmentCreator {  //approve assignment task by admin
        this._helper.goToiFrame('.k-content-frame', (frame) => {
            this._helper
                .setValue('.form-control.comment.text-box.multi-line', comments)
                .waitForElementVisible('a.f-btn.submit-link.ms-heroCommandLink[data-value="Approve"]', Constants.Timeouts.Large)
                .click('a.f-btn.submit-link.ms-heroCommandLink[data-value="Approve"]')
                .frameParent();
        })
        this._browser.waitForElementVisible('.assignmentsList', Constants.Timeouts.Large)
        return this;
    }

    public returnAssignmentTask(comments): AssignmentCreator {  //return assignment task by admin
        this._helper.goToiFrame('.k-content-frame', (frame) => {
            this._helper
                .setValue('.form-control.comment.text-box.multi-line', comments)
                .waitForElementVisible('a.f-btn.submit-link.ms-heroCommandLink[data-value="Return"]', Constants.Timeouts.Large)
                .click('a.f-btn.submit-link.ms-heroCommandLink[data-value="Return"]')
                .frameParent();
        })
        this._browser.waitForElementVisible('.assignmentsList', Constants.Timeouts.Large)
        return this;
    }

    public cancelAssignmentTask(comments): AssignmentCreator { //cancel assignment task changes by learner/admin
        this._helper.goToiFrame('.k-content-frame', (frame) => {
            this._browser
                .waitForElementVisible('a.f-btn.cancel-link.ms-heroCommandLink', Constants.Timeouts.Large)
                .click('a.f-btn.cancel-link.ms-heroCommandLink')
                .frameParent();
        })
        this._browser.waitForElementVisible('.assignmentsList', Constants.Timeouts.Large)
        return this;
    }

    public uploadFileInTask(file): AssignmentCreator {
        this._helper.goToiFrame('.k-content-frame', (frame) => {
            this._browser
                .waitForElementVisible('caption.ms-dragDropAttract', Constants.Timeouts.Large)
                .waitForElementVisible('a.file-btn.main-file-btn.file-link.upload-link.ms-heroCommandLink:not([style*="display: none"])', Constants.Timeouts.Large)
                .waitForElementNotPresent('span.ms-accentText', Constants.Timeouts.Large)
                .click('a.file-btn.main-file-btn.file-link.upload-link.ms-heroCommandLink:not([style*="display: none"])') // upload file button
                .useXpath()
                .waitForElementVisible('//div[@class="ms-dlgContent upload-file-dialog ui-draggable ui-draggable-handle"]//input[@class="file ms-long ms-spellcheck-true"]', Constants.Timeouts.Large);
            this._helper
                .setValue('//div[@class="ms-dlgContent upload-file-dialog ui-draggable ui-draggable-handle"]//input[@class="file ms-long ms-spellcheck-true"]', file) //upload file
                .pause(1000)
                .click('//div[@class="ms-dlgContent upload-file-dialog ui-draggable ui-draggable-handle"]//input[@class="ms-ButtonHeightWidth upload close-dialog"]') //ok button
                .useCss();
        })
        return this;
    }

    public createWordInTask(): AssignmentCreator {
        this._helper.goToiFrame('.k-content-frame', (frame) => {
            this._browser
                .waitForElementVisible('caption.ms-dragDropAttract', Constants.Timeouts.Large)
                .waitForElementVisible('a.file-btn.main-file-btn.file-link.new-link.ms-heroCommandLink', Constants.Timeouts.Large)
                .waitForElementNotPresent('span.ms-accentText', Constants.Timeouts.Large)
                .click('a.file-btn.main-file-btn.file-link.new-link.ms-heroCommandLink') //add new
                .pause(2000)
                .waitForElementVisible('.js-callout-mainElement.ms-core-defaultFont.ms-alignLeft.ms-shadow.new-file-menu', Constants.Timeouts.Large)
                .useXpath().click('//a[@data-doctype="document"]') //new word
                .useCss()
                .pause(7000);
            this._helper.returnToWindow()
        })
        return this;
    }

    public createExcelInTask(): AssignmentCreator {
        this._helper.goToiFrame('.k-content-frame', (frame) => {
            this._browser
                .waitForElementVisible('caption.ms-dragDropAttract', Constants.Timeouts.Large)
                .waitForElementVisible('a.file-btn.main-file-btn.file-link.new-link.ms-heroCommandLink', Constants.Timeouts.Large)
                .waitForElementNotPresent('span.ms-accentText', Constants.Timeouts.Large)
                .click('a.file-btn.main-file-btn.file-link.new-link.ms-heroCommandLink') //add new
                .pause(2000)
                .waitForElementVisible('.js-callout-mainElement.ms-core-defaultFont.ms-alignLeft.ms-shadow.new-file-menu', Constants.Timeouts.Large)
                .useXpath().click('//a[@data-doctype="workbook"]') //new excel
                .useCss()
                .pause(7000);
            this._helper.returnToWindow()
        })
        return this;
    }

    public createPresentationInTask(): AssignmentCreator {
        this._helper.goToiFrame('.k-content-frame', (frame) => {
            this._browser
                .waitForElementVisible('caption.ms-dragDropAttract', Constants.Timeouts.Large)
                .waitForElementVisible('a.file-btn.main-file-btn.file-link.new-link.ms-heroCommandLink', Constants.Timeouts.Large)
                .waitForElementNotPresent('span.ms-accentText', Constants.Timeouts.Large)
                .click('a.file-btn.main-file-btn.file-link.new-link.ms-heroCommandLink') //add new
                .pause(2000)
                .waitForElementVisible('.js-callout-mainElement.ms-core-defaultFont.ms-alignLeft.ms-shadow.new-file-menu', Constants.Timeouts.Large)
                .useXpath().click('//a[@data-doctype="presentation"]') //new presentation
                .useCss()
                .pause(7000);
            this._helper.returnToWindow()
        })
        return this;
    }

    public checkStatus(line, status): AssignmentCreator { //verify status of task in assignments list for learner/admin mode
        let that = this;
        this._browser.element('xpath', '//a[@data-due-tab="All"]', function (result) {
            if (result.value && result.value.ELEMENT) {
                that._browser
                    .useXpath()
                    .click('//a[@data-due-tab="All"]');
            }
        });
        that._browser
            .useXpath()
            .waitForElementPresent(`//tr[td[contains(text(),"${line}")]]//td[contains(text(),"${status}")]`, Constants.Timeouts.Large) //check status
            .useCss();
        return this;
    }    

}