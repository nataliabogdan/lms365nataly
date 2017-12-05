import { NightWatchBrowser as Browser } from 'nightwatch';
import { Helper } from './helpers/helper';
import { LearningPathInfo, LearningPathItem, LearningItemType } from './models';
import { Constants } from './constants';
import { LpConstants } from './lpconst'

declare const WORKING_PATH: string;



export class LearningPathCreator {
    private readonly _browser: Browser;
    private readonly _helper: Helper;

    public constructor(browser: Browser) {
        this._browser = browser;
        this._helper = new Helper(browser);
    }


    public goToLearningPathOnCourse(): LearningPathCreator {
        this._browser
            .useXpath()
            .pause(3000)
            .click('//tr[td[contains(text(),"e-Learning")]]//td[span[a[span[contains(@class,"icon-ellipsis")]]]]')
            .pause(4000)
            .click('//div[contains(@class, "contentInner_09d1013a")]//span[contains(text(), "Manage Learning Modules")]')
        return this;
    }

    public goToCreateLearningPathPage(): LearningPathCreator {
        this._browser
            .useCss()
            .waitForElementVisible('div.create-learning-path', Constants.Timeouts.Large)
            .click('div.create-learning-path')
        return this;
    }

    public create(learningPathInfo: LearningPathInfo): LearningPathCreator {
        if (learningPathInfo.title) {
            this._browser
                .useCss()
                .setValue('input#Title', learningPathInfo.title);
        }

        if (learningPathInfo.description) {
            this._browser
                .useCss()
                .setValue('input#Description', learningPathInfo.description);
        }
        this.togglePublishing(learningPathInfo.published);

        if (learningPathInfo.items) {
            learningPathInfo.items.map(x => this.addLearningItem(x));
        }

        this.saveLearningPath()
        return this;
    }

    public edit(learningPathInfo: LearningPathInfo): LearningPathCreator {

        this._browser
            .useCss()
            .clearValue('input#Title')
            .setValue('input#Title', learningPathInfo.title, () => {
                console.log('Learning Module title is updated')
            });
        

        this._browser
            .useCss()
            .clearValue('input#Description')
            .setValue('input#Description', learningPathInfo.description, () => {
                console.log('Learning Module description is updated')
            });
        

        if (learningPathInfo.items) {
            learningPathInfo.items.map(x => this.addLearningItem(x));
        }

        this.togglePublishing(learningPathInfo.published);

        return this;
    }

    public FillLearningPathEdit(): LearningPathCreator {
        this._browser
            .pause(2000)
            .useCss()
            .clearValue('input#Title')
            .setValue('input#Title', '!lp edit')
            .clearValue('input#Description')
            .setValue('input#Description', 'upd')
        return this;
    }

    private addLearningItem(item: LearningPathItem) {


        switch (item.type) {
            case LearningItemType.Youtube:
                this.addYoutube(item.title);
                break;
            case LearningItemType.ExternalLink:
                this.addExternalLink(item.title);
                break;
            case LearningItemType.EmbeddeCode:
                this.addEmbeddeCode(item.title);
                break;
            case LearningItemType.OfficeMix:
                this.addOfficeMix(item.title);
                break;
            case LearningItemType.Confirmation:
                this.addConfirmation();
                break;
            case LearningItemType.Content:
                this.addContent();
                break;
            case LearningItemType.LinkToDocument:
                this.addLinkToDocument(item.title);
                break;
            case LearningItemType.Quiz:
                this.addQuiz(item.title);
                break;
            case LearningItemType.Scorm:
                this.addScorm(item.title);
                break;
            case LearningItemType.File:
                this.dragAndDropElement(item.fileName);
                break;
        }
    }

    public dragAndDropItem(value: string): LearningPathCreator {
        this._browser
            .useCss()
            .moveToElement(value, 2, 2)
            .mouseButtonDown('left')
            .moveToElement('.k-item.footer', 10, 10)
            .mouseButtonUp('left')
        return this;
    }

    private fillEmbeddedCode(title: string, code: string): LearningPathCreator {
        this._browser
            .setValue('#embed-dialog input#embeddingTitle', title)
            .pause(2000)
            .setValue('#embed-dialog textarea#embeddingText', code)
            .click('#embed-dialog input#embeddingInsertBtn')
            .pause(1000)  // Keep browser open for 1 seconds so you can see result
        return this;
    }

    private fillEmbeddedLink(title: string, code: string): LearningPathCreator {
        this._browser
            .setValue('#embed-link-dialog input#embeddingTitle', title)
            .pause(2000)
            .setValue('#embed-link-dialog input#embeddingText', code)
            .click('#embed-link-dialog input#embeddingInsertBtn')
            .pause(1000)  // Keep browser open for 1 seconds so you can see result
        return this;
    }

    private fillConfirmation(): LearningPathCreator {
        this._browser
            .pause(4000)
            .click('#embed-confirmation-dialog input#embeddingInsertBtn')
            .pause(4000)
        return this;
    }

    // private dragAndDropWord(): LearningPathCreator {
    //     this._browser
    //         .useCss()
    //         .click('.collapse.k-icon.k-i-arrow-s')
    //         .pause(1000)

    //         .moveToElement('span.word-icon', 2, 2)
    //         .mouseButtonDown('left')
    //         .moveToElement('.k-item.footer', 10, 10)
    //         .mouseButtonUp('left')
    //     return this;
    // }

    private dragAndDropElement(element: string): LearningPathCreator {
        this._browser
            .useXpath().moveToElement(`//tr/td/a[@data-file-name="${element}"]`, 2, 2)
            .useCss()
            .mouseButtonDown('left')
            .moveToElement('.k-item.footer', 10, 10)
            .mouseButtonUp('left')
        return this;
    }

    private fillContent(): LearningPathCreator {
        this._browser
            .setValue('#embed-rich-dialog input#embeddingTitle', 'Rich Content')
            .pause(4000)
        this._helper.goToiFrame('iframe.k-content', (frame) => {
            this._browser
                .setValue('html>body', 'Rich Content text')
                .frameParent();
        });
        this._browser
            .click('#embed-rich-dialog input#embeddingInsertBtn')
            .pause(4000)
        return this;
    }

    private selectQuiz(title): LearningPathCreator {
        this._browser
            .useXpath()
            .waitForElementPresent(`//tr[td[contains(text(),"${title}")]]`, Constants.Timeouts.Large)
            .click(`//tr[td[contains(text(),"${title}")]]//label[@class="switch switch-green"]`)
            .pause(1000)
            .useCss()
            .click('#external-dialog input#externalInsertBtn')
            .pause(1000)
        return this;
    }


    private selectScorm(title): LearningPathCreator {
        this._browser
            //.useXpath().waitForElementPresent('//tr[td[contains(text(),"scorm for LP")]]', Constants.Timeouts.Large)\
            .useXpath().waitForElementPresent(`//tr[td[contains(text(),"${title}")]]`, Constants.Timeouts.Large)
            .pause(1000)
            .useXpath().click(`//tr[td[contains(text(),"${title}")]]//label[@class="switch switch-green"]`)
            .pause(1000)
            .useCss().click('#external-dialog input#externalInsertBtn')
            .pause(1000)
        return this;
    }

    private addQuiz(title: string): LearningPathCreator {
        this
            .dragAndDropItem('span.quiz-icon')
            .selectQuiz(title)
        return this;
    }


    private addScorm(title: string): LearningPathCreator {
        this
            .dragAndDropItem('span.scorm-icon')
            .selectScorm(title)
        return this;
    }

    private addOfficeMix(title?: string): LearningPathCreator {
        this
            .dragAndDropItem('span.officeMix-icon')
            .fillEmbeddedCode(LpConstants.OfficeMix.Title, LpConstants.OfficeMix.Code)
        return this;
    }

    private addYoutube(title?: string): LearningPathCreator {
        this
            .dragAndDropItem('span.youTube-icon')
            .fillEmbeddedCode((title ? title : LpConstants.Youtube.Title), LpConstants.Youtube.Code)
        return this;
    }

    private addEmbeddeCode(title?: string): LearningPathCreator {
        this
            .dragAndDropItem('span.otherEmbed-icon')
            .fillEmbeddedCode((title ? title : LpConstants.Vimeo.Title), LpConstants.Vimeo.Code)
        return this;
    }

    private addConfirmation(): LearningPathCreator {
        this
            .dragAndDropItem('span.confirmation-icon')
            .fillConfirmation()
        return this;
    }

    private addExternalLink(title?: string): LearningPathCreator {
        this
            .dragAndDropItem('span.website-icon')
            .fillEmbeddedLink((title ? title : LpConstants.ExternalLink.Title), LpConstants.ExternalLink.Code)
        return this;
    }

    private addContent(): LearningPathCreator {
        this
            .dragAndDropItem('span.richContent-icon')
            .fillContent()
        return this;
    }

    private addLinkToDocument(title?: string): LearningPathCreator {
        this
            .dragAndDropItem('span.link-icon')
            .fillEmbeddedLink((title ? title : LpConstants.LinkToDocument.Title), LpConstants.LinkToDocument.Code)
        return this;

    }

    public openDocumentList(): LearningPathCreator {
        this._browser
            .pause(3000)
            .useCss()
            .click('.collapse.k-icon.k-i-arrow-s')

        return this;

    }

    private initUpload(): LearningPathCreator {
        this._browser
            .pause(3000)
            .useCss()
            .click('div.dropzone a.upload-link')
            .pause(1000)
        return this;
    }

    private uploadWord(title: string): LearningPathCreator {
        this._browser
            .setValue('input.file', `${WORKING_PATH}/files/${title}`)
        return this;
    }

    private confirmUpload(): LearningPathCreator {
        this._browser
            .click('input.upload')
        return this;

    }

    public initCreateWord(): LearningPathCreator {
        this._browser
            .pause(5000)
            .useCss()
            .click('div.dropzone a.new-link')
            .click('.ms-newdoc-callout-main a:nth-child(1)')
            .pause(1000)
        return this;
    }

    public initCreateExcel(): LearningPathCreator {
        this._browser
            .pause(5000)
            .useCss()
            .click('div.dropzone a.new-link')
            .click('.ms-newdoc-callout-main a:nth-child(2)')
            .pause(1000)
        return this;
    }

    public initCreatePowerPoint(): LearningPathCreator {
        this._browser
            .pause(5000)
            .useCss()
            .click('div.dropzone a.new-link')
            .click('.ms-newdoc-callout-main a:nth-child(3)')
            .pause(1000)
        return this;
    }

    public returnToWindow(): LearningPathCreator {
        this._browser
            .pause(3000)
            .windowHandles(function (result) {
                let lpWindow = result.value[0];
                this.switchWindow(lpWindow);
            })
        return this;
    }

    public togglePublishing(needToSelect: boolean): LearningPathCreator {
        this._browser.element('css selector', 'input.switch-input', (response) => {
            this._browser.elementIdSelected(response.value.ELEMENT, (result) => {
                debugger;
                if ((needToSelect == true && result.value == false) || (needToSelect == false && result.value == true)) {
                    this._browser.useCss().click('span.switch-handle');
                }
            });
        });
        return this;
    }

    public openLpEditForm(lptitle: string): LearningPathCreator {
        this
            .openActionMenuLearningPath(lptitle)
            .initEditAction()
        return this;
    }
    public deleteLp(lptitle: string): LearningPathCreator {
        this
            .openActionMenuLearningPath(lptitle)
            .initDeleteAction()
        this._browser.acceptAlert()
        return this;
    }

    private openActionMenuLearningPath(text: string): LearningPathCreator {
        this._browser
            .useXpath().waitForElementVisible(`//tr[td[contains(text(),"${text}")]]`, Constants.Timeouts.Huge)
            .useXpath().click(`//tr[td[contains(text(),"${text}")]]//a[@class="actions-link calloutCallLink"]`)
        return this;
    }

    private initEditAction(): LearningPathCreator {
        this._browser
            .useXpath().click('//a[div[i[contains(@data-icon-name,"Edit")]]]')
        return this;
    }

    private initDeleteAction(): LearningPathCreator {
        this._browser
            .useXpath().click('//button[div[i[contains(@data-icon-name,"Trash")]]]')
        return this;
    }

    public uploadDocument(title: string): LearningPathCreator {
        this
            .initUpload()
            .uploadWord(title)
            .confirmUpload()
        return this;
    }

    public saveLearningPath(): LearningPathCreator {
        this._browser
            .useCss()
            .click('div.footer-btn-group a.save-link') //click save
        return this;
    }

    public findLearningPath(text: string): LearningPathCreator {
        this._browser
            .useXpath()
            .waitForElementPresent(`//tr[td[contains(text(),"${text}")]]`, Constants.Timeouts.Large)
        return this;
    }

    public selectLearningPath(text: string): LearningPathCreator {
        this._browser
            .useXpath().click(`//tr[td[contains(text(),"${text}")]]//a[@class="actions-link calloutCallLink"]`)
        return this;
    }


    public checkLPInList(title: string): LearningPathCreator {
        this._browser
            .pause(1000)
            .useCss().waitForElementVisible('div#learningPathGrid', Constants.Timeouts.Large)
            .useXpath().assert.elementPresent(`//tr[td[contains(text(),"${title}")]]`)
        return this;
    }

    public checkLPNotInList(title: string): LearningPathCreator {
        this._browser
            .pause(1000)
            .useCss().waitForElementVisible('div#learningPathGrid', Constants.Timeouts.Large)
            // .useXpath().assert.elementNotPresent(`//tr[td[contains(text(),"${title}")]]`)
        return this;
    }

    public toggleLocking(title: string): LearningPathCreator {
        this._browser
            .useXpath().click(`//tr[td[contains(text(),"${title}")]]//td[@class="ms-cellstyle lock"]`)
        return this;
    }

    public saveChangesInList(): LearningPathCreator {
        this._browser
            .useCss()
            .click('span.icon-save')
            .assert.visible('#learningPathGrid span.icon-lock.locked');
        return this;
    }
}