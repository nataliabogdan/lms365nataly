import { NightWatchBrowser as Browser } from 'nightwatch';
import { Helper } from './helpers/helper';
import { ScormInfo, AICCInfo } from './models';
import { Constants } from './constants';

declare const WORKING_PATH: string;

export class ScormCreator {
    private readonly _browser: Browser;
    private readonly _helper: Helper;


    public constructor(browser: Browser) {
        this._browser = browser;
        this._helper = new Helper(browser);
    }

    public goToScormStoragelistNewNav(): ScormCreator {
        this._browser
            .useCss()
            .waitForElementVisible('a[title="Manage Content"]', Constants.Timeouts.Huge, true)
            .click('a[title="Manage Content"]', () => {
            console.log('Manage Content link is clicked')
            })
            .waitForElementVisible('a.ms-Nav-link[href*="/Scorm/Packages/List?"]', Constants.Timeouts.Large, true)
            .click('a.ms-Nav-link[href*="/Scorm/Packages/List?"]', () => {
                console.log('Upload Content Packages left side bar link is clicked')
                })
            .waitForElementVisible('div.k-grid-content', Constants.Timeouts.Large);
        return this;
    }

    public UploadScormPackageToStorage(title: string) {
        this._helper.navigation.goToScorm();
        this.goToScormStoragelistNewNav();
        this.initScormUploading();

        const that = this;
        this._helper.goToiFrame('iframe.k-content-frame', (frame) => {
            that.fillScormUpload()
                .fillTitle(title)
                .saveScormUpload();
        });
    }

    public downloadPackage(titleScorm: string, fileName: string): ScormCreator {
        this
            .waitGrid()
            .filterByName(titleScorm)
            .waitGrid()
            .clickOnPackage(fileName)
        return this;

    }
    
    private clickOnPackage(fileName: string): ScormCreator {
        this._browser
            .useXpath()
            .waitForElementPresent(`//a[contains(@href, "${fileName}")]`, Constants.Timeouts.Large)
            .click(`//a[contains(@href, "${fileName}")]`)
        return this;

    }

    private waitGrid(): ScormCreator {
        this._browser
            .useXpath()
            .waitForElementVisible('//a[span[contains(@class, "icon-ellipsis")]]', Constants.Timeouts.Large)
        return this;
    }

    // private waitWorkingOnIt(): ScormCreator {
    //     this._browser
    //         .useCss()
    //         .waitForElementVisible("div.loader ms-core-overlay", Constants.Timeouts.Large)
    //     return this;
    // }

    private filterByName(titleScorm: string): ScormCreator {
        this._browser
            .useXpath()
            .waitForElementVisible('//a[contains(@target, "_top")]', Constants.Timeouts.Large, true)
            .moveToElement('//th[contains(@data-field, "Title")]//span[contains(@class, "k-icon")]', 5, 5)
            .click('//th[contains(@data-field, "Title")]//span[contains(@class, "k-icon")]')
            .waitForElementVisible('//input[contains(@data-bind, "value:filters[0].value")]', Constants.Timeouts.Large)
            .click('//input[contains(@data-bind, "value:filters[0].value")]')
            .clearValue('//input[contains(@data-bind, "value:filters[0].value")]')
            .setValue('//input[contains(@data-bind, "value:filters[0].value")]', titleScorm)
            .waitForElementVisible('//button[contains(@class, "k-primary")]', Constants.Timeouts.Large)
            .click('//button[contains(@class, "k-primary")]')
        return this;
    }

    private initScormUploading(): ScormCreator {
        this._browser
            .pause(2000)
            .useCss()
            .click('a#uploadScormLink')
            .waitForElementVisible('iframe', Constants.Timeouts.Large)
        return this;
    }

    private fillScormUpload(): ScormCreator {
        this._browser
            .useCss()
            .waitForElementVisible("div#s4-workspace", Constants.Timeouts.Large)
            .setValue('input', `${WORKING_PATH}/files/bn.zip`)
            .waitForElementVisible("div.dialog-button-set", Constants.Timeouts.Large)
            .click('input#upload-button')
        return this;
    }

    private FillAICCUpload(): ScormCreator {
        this._browser
            .waitForElementVisible("div#s4-workspace", Constants.Timeouts.Large)
            .setValue('input', `${WORKING_PATH}/files/Lynda.zip`)
            .waitForElementVisible("div.dialog-button-set", Constants.Timeouts.Large)
            .click('input#upload-button')
        return this;
    }

    private fillTitle(title: string): ScormCreator {
        this._browser
            .useCss()
            .waitForElementVisible("div#scorm-editor", Constants.Timeouts.Large)
            .clearValue('input#config-title')
            .setValue('input#config-title', `${title}`)
        return this;
    }

    private fillDescription(description: string): ScormCreator {
        this._browser
            .useCss()
            .waitForElementVisible("div#scorm-editor", Constants.Timeouts.Large)
            .clearValue('input#config-description')
            .setValue('input#config-description', `${description}`)
        return this;
    }

    private fillMaxAttempts(attempt: number): ScormCreator {
        this._browser
            .useCss()
            .waitForElementVisible("div#scorm-editor", Constants.Timeouts.Large)
            .clearValue('input#config-attempts')
            .setValue('input#config-attempts', `${attempt}`)
        return this;
    }

    private fillTimeOut(timeout: number): ScormCreator {
        this._browser
            .useCss()
            .waitForElementVisible("div#scorm-editor", Constants.Timeouts.Large)
            .clearValue('input#config-timeout')
            .setValue('input#config-timeout', `${timeout}`)
        return this;
    }

    private saveScormUpload(): ScormCreator {
        this._browser
            .useCss()
            .click('input#save-button')
        return this;
    }

    private DeleteItem(): ScormCreator {
        this._browser
            .useCss().waitForElementVisible("div#s4-workspace", Constants.Timeouts.Large)
            .click('input#saveChanges')
        return this;
    }

    private openActionMenuItem(title: string): ScormCreator {
        this._browser
            .useXpath()
            .waitForElementVisible('//a[span[contains(@class, "icon-ellipsis")]]', Constants.Timeouts.Large)
            .waitForElementPresent(`//tr[td[contains(text(), '${title}')]]`, Constants.Timeouts.Large)
            .click(`//tr[td[contains(text(),'${title}')]]//span`)
        return this;
    }

    public openEditForm(titleScorm: string): ScormCreator {
        this
            .waitGrid()
            .filterByName(titleScorm)
            .openActionMenuItem(titleScorm)
            .initEditAction()

        return this;
    }

    public openDeleteForm(titleScorm: string): ScormCreator {
        this
            .waitGrid()
            .filterByName(titleScorm)
            .openActionMenuItem(titleScorm)
            .InitDeleteAction()

        return this;
    }

    public checkScormInList(titleScorm:string): ScormCreator {
        this._browser.refresh()
        this.waitGrid()
        this.filterByName(titleScorm)
        this._browser.waitForElementVisible(`//tr[td[contains(text(), "${titleScorm}")]]`, Constants.Timeouts.Medium)
        return this;
    }

    public checkScormNotInList(titleScorm:string): ScormCreator {
        this._browser.refresh()
        this.waitGrid()
        this.filterByName(titleScorm)
        this._browser.waitForElementVisible(`//tr[td[contains(text(), "No Content Package(s) found.")]]`, Constants.Timeouts.Medium)
        return this;
    }

    private InitDeleteAction(): ScormCreator {
        this._browser
            .useXpath().click('//button[div[i[contains(@data-icon-name,"Trash")]]]')
            this.confirmDelete()
        return this;
    }

    private initEditAction(): ScormCreator {
        this._browser
            .useXpath().click('//button[div[i[contains(@data-icon-name, "Edit")]]]')
        return this;
    }

    private confirmDelete(): ScormCreator {
        this._helper
            .goToiFrame('iframe.k-content-frame', (frame) => {
                this._helper.scormCreator.DeleteItem()
            });
            return this;
    }

    public goToScormStorage(): ScormCreator {

        this._browser
            .click('a.tileLink.scorm-storage')
        return this;
    }

    public createScorm(scormInfo: ScormInfo): ScormCreator {
        this.initScormUploading();
        this._helper.goToiFrame('iframe.k-content-frame', (frame) => {
            this.fillScormUpload();
            if (scormInfo.title) {
                this.fillTitle(scormInfo.title);
            }
            if (scormInfo.description) {
                this.fillDescription(scormInfo.description);
            }
            if (scormInfo.maxAttempts) {
                this.fillMaxAttempts(scormInfo.maxAttempts);
            }

            if (scormInfo.timeOut) {
                this.fillTimeOut(scormInfo.timeOut)
            }
            
            this._helper.toggleCheckbox(scormInfo.openInNewWindow,'config-newWindow');
            this._helper.toggleCheckbox(scormInfo.showNavigation,'config-showNavigation');
            this._helper.toggleCheckbox(scormInfo.showToc,'config-showToc');
            
            this.saveScormUpload();


        });
        return this;
    }

    public createAICC(aiccInfo: AICCInfo): ScormCreator {
        this.initScormUploading();
        this._helper.goToiFrame('iframe.k-content-frame', (frame) => {
            this.FillAICCUpload();
            if (aiccInfo.title) {
                this.fillTitle(aiccInfo.title);
            }
            if (aiccInfo.description) {
                this.fillDescription(aiccInfo.description);
            }
            if (aiccInfo.maxAttempts) {
                this.fillMaxAttempts(aiccInfo.maxAttempts);
            }

            if (aiccInfo.timeOut) {
                this.fillTimeOut(aiccInfo.timeOut)
            }
            
            this._helper.toggleCheckbox(aiccInfo.openInNewWindow, 'config-newWindow');
            this._helper.toggleCheckbox(aiccInfo.showSubmit, 'config-showSubmitButton');
            this._helper.toggleCheckbox(aiccInfo.showTitle, 'config-showTitleBar');
            this._helper.toggleCheckbox(aiccInfo.autoClosePlayer, 'config-automaticallyCloseThePlayer');
            
            this.saveScormUpload();

        });
        return this;
    }


    public editScorm(scormInfo: ScormInfo): ScormCreator {
        this._helper.goToiFrame('iframe.k-content-frame', (frame) => {
            if (scormInfo.title) {
                this.fillTitle(scormInfo.title);
            }
            if (scormInfo.description) {
                this.fillDescription(scormInfo.description);
            }
            if (scormInfo.maxAttempts) {
                this.fillMaxAttempts(scormInfo.maxAttempts);
            }

            if (scormInfo.timeOut) {
                this.fillTimeOut(scormInfo.timeOut)
            }
            this._helper.toggleCheckbox(scormInfo.openInNewWindow, 'config-newWindow');
            this._helper.toggleCheckbox(scormInfo.showNavigation, 'config-showNavigation');
            this._helper.toggleCheckbox(scormInfo.showToc, 'config-showToc');
        
            this.saveScormUpload();
        });
        return this;
    }

    public editAICC(aiccInfo: AICCInfo): ScormCreator {
        this._helper.goToiFrame('iframe.k-content-frame', (frame) => {
            if (aiccInfo.title) {
                this.fillTitle(aiccInfo.title);
            }
            if (aiccInfo.description) {
                this.fillDescription(aiccInfo.description);
            }
            if (aiccInfo.maxAttempts) {
                this.fillMaxAttempts(aiccInfo.maxAttempts);
            }

            if (aiccInfo.timeOut) {
                this.fillTimeOut(aiccInfo.timeOut)
            }
            
            this._helper.toggleCheckbox(aiccInfo.openInNewWindow, 'config-newWindow');
            this._helper.toggleCheckbox(aiccInfo.showSubmit, 'config-showSubmitButton');
            this._helper.toggleCheckbox(aiccInfo.showTitle, 'config-showTitleBar');
            this._helper.toggleCheckbox(aiccInfo.autoClosePlayer, 'config-automaticallyCloseThePlayer');
            
            this.saveScormUpload();
        });
        return this;
    }

}