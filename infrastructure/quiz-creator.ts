import { NightWatchBrowser as Browser } from 'nightwatch';
import { Constants } from './constants';
import { QuizFields, QuizQuestionFields, QuetionType } from './models';
import { Helper } from './helpers/helper';

export class QuizCreator {
    private readonly _browser: Browser;
    private readonly _helper: Helper;

    public constructor(browser: Browser) {
        this._browser = browser;
        this._helper = new Helper(browser);
    }

    public create(quizFields: QuizFields): QuizCreator {
        if (quizFields) {
            this._helper.setValue('#Title', quizFields.title)
                .setValue('#Description', quizFields.description)
                .clearValue('#PassingPercentage')
                .setValue('#PassingPercentage', (quizFields.quiz_passing_score || '').toString());
            if (quizFields.max_attempts) {
                this._helper.setValue('#MaxAttemptsLimit', quizFields.max_attempts.toString())
            }
            if (quizFields.allow_review) {
                this.allowReview();
            }
            if (quizFields.allow_review && quizFields.show_correct_answers) {
                this.showCorrectAnswers();
            }
            if (quizFields.questions) {
                quizFields.questions.map(x => this.addQuestion(x)); //question creating massive
            }
        }
        return this;
    }

    public save(): QuizCreator {
        this._browser
            .waitForElementVisible('.vLinkButton.save-link.ms-heroCommandLink', Constants.Timeouts.Large)
            .click('.vLinkButton.save-link.ms-heroCommandLink')
        .waitForElementVisible('#grid', Constants.Timeouts.Large)
        .assert.visible(`#grid`);
        return this;
    }

    private addQuestion(question: QuizQuestionFields) {
        switch (question.question_type) {
            case QuetionType.multipleChoise:
                this.addMultipleChoice(question);
                break;
            case QuetionType.multipleAnswers:
                this.addMultipleAnswers(question);
                break;
            case QuetionType.trueOrFalse:
                this.addTrueOrFalse(question);
                break;
            case QuetionType.ordering:
                this.addOrdering(question);
                break;
            case QuetionType.matching:
                this.addMatching(question);
                break;
            case QuetionType.hotSpot:
                this.addHotSpot(question);
                break;
            case QuetionType.shortAnswer:
                this.addShortAnswer(question);
                break;
            case QuetionType.freeAnswer:
                this.addFreeAnswer(question);
                break;
            case QuetionType.fillGap:
                this.addFillGap(question);
                break;
        }
    }

    private allowReview(): QuizCreator {
        this._browser
            .useXpath()
            .waitForElementVisible('//*[@id="quiz-editor"]/form/table[1]/tbody/tr[5]/td[2]/label', Constants.Timeouts.Medium)
            .click('//*[@id="quiz-editor"]/form/table[1]/tbody/tr[5]/td[2]/label')
            .useCss();
        return this;
    }

    private showCorrectAnswers(): QuizCreator {
        this._browser
            .useXpath()
            .waitForElementVisible('//*[@id="showAnswersTr"]/td[2]/label', Constants.Timeouts.Medium)
            .click('//*[@id="showAnswersTr"]/td[2]/label')
            .useCss();
        return this;
    }

    private addMultipleChoice(quizQuestionFields: QuizQuestionFields): QuizCreator {
        if (quizQuestionFields) {
            this._browser
                .moveToElement('.spo-emphasis-background.multi-choice-question-icon', 5, 5)
                .mouseButtonDown('left')
                .moveToElement('.quiz-tree-section.spo-dialog-border', 5, 5)
                .mouseButtonUp('left')
                .waitForElementVisible('#question-designer-dialog', Constants.Timeouts.Large)
            this._helper.setValue('#q-title', quizQuestionFields.question_name)
            this._helper.goToiFrame('iframe.k-content', (frame) => {
                this._helper.setValue('html>body', quizQuestionFields.question);
                this._browser.frameParent();
            });
            if (quizQuestionFields.uploads_to_question) {
                quizQuestionFields.uploads_to_question.map(x => this._helper.uploadFilesToKendo(x));
            }
            this._helper.setValue('#q-points', (quizQuestionFields.points_awarded || '').toString())
                .click('.add-answer-link.ms-heroCommandLink') //add new answer
                .waitForElementPresent('.k-grid-edit-row', Constants.Timeouts.Medium); //add new answer
            this._helper.setValue('#multi-answers-grid > table > tbody > tr.k-grid-edit-row > td.answer-text-td > input', quizQuestionFields.answer) //add new answer
                .click('span.icon-save2')
                .click('div.dialog-button-set > input#save-button')
                //.waitForElementPresent('.quizCreatorTd.quizTreeTd', Constants.Timeouts.Medium)
                .pause(1000);
        }
        return this;
    }

    private addMultipleAnswers(quizQuestionFields: QuizQuestionFields): QuizCreator {
        if (quizQuestionFields) {
            this._browser
                .moveToElement('.spo-emphasis-background.multi-answers-question-icon', 10, 10)
                .mouseButtonDown('left')
                .moveToElement('.quiz-tree-section.spo-dialog-border', 10, 10)
                .mouseButtonUp('left')
                .waitForElementVisible('#question-designer-dialog', Constants.Timeouts.Large)
            this._helper.setValue('#q-title', quizQuestionFields.question_name)
            this._helper.goToiFrame('iframe.k-content', (frame) => {
                this._helper.setValue('html>body', quizQuestionFields.question)
                this._browser.frameParent();
            });
            if (quizQuestionFields.uploads_to_question) {
                quizQuestionFields.uploads_to_question.map(x => this._helper.uploadFilesToKendo(x));
            }
            this._browser
                .clearValue('#q-points');
            this._helper.setValue('#q-points', (quizQuestionFields.points_awarded || '').toString())
                .click('.add-answer-link.ms-heroCommandLink') //add new answer
                .waitForElementPresent('.k-grid-edit-row', Constants.Timeouts.Medium) //add new answer
            this._helper.setValue('#multi-answers-grid > table > tbody > tr.k-grid-edit-row > td.answer-text-td > input', quizQuestionFields.answer) //add new answer
                .click('span.icon-save2')
                .click('div.dialog-button-set > input#save-button')
                //.waitForElementPresent('.quizCreatorTd.quizTreeTd', Constants.Timeouts.Medium)      
                .pause(1000);
        }
        return this;
    }

    private addTrueOrFalse(quizQuestionFields: QuizQuestionFields): QuizCreator {
        if (quizQuestionFields) {
            this._browser
                .moveToElement('.spo-emphasis-background.true-or-false-question-icon', 10, 10)
                .mouseButtonDown('left')
                .moveToElement('.quiz-tree-section.spo-dialog-border', 10, 10)
                .mouseButtonUp('left')
                .waitForElementVisible('#question-designer-dialog', Constants.Timeouts.Large)
            this._helper.setValue('#q-title', quizQuestionFields.question_name)
            this._helper.goToiFrame('iframe.k-content', (frame) => {
                this._helper.setValue('html>body', quizQuestionFields.question)
                this._browser.frameParent();
            });
            if (quizQuestionFields.uploads_to_question) {
                quizQuestionFields.uploads_to_question.map(x => this._helper.uploadFilesToKendo(x));
            }
            this._browser
                .clearValue('#q-points');
            this._helper.setValue('#q-points', (quizQuestionFields.points_awarded || '').toString())
                .click('div.dialog-button-set > input#save-button')
                //.waitForElementPresent('.quizCreatorTd.quizTreeTd', Constants.Timeouts.Medium)      
                .pause(1000);
        }
        return this;
    }

    private addOrdering(quizQuestionFields: QuizQuestionFields): QuizCreator {
        if (quizQuestionFields) {
            this._browser
                .moveToElement('.spo-emphasis-background.ordering-question-icon', 10, 10)
                .mouseButtonDown('left')
                .moveToElement('.quiz-tree-section.spo-dialog-border', 10, 10)
                .mouseButtonUp('left')
                .waitForElementVisible('#question-designer-dialog', Constants.Timeouts.Large)
            this._helper.setValue('#q-title', quizQuestionFields.question_name)
            this._helper.goToiFrame('iframe.k-content', (frame) => {
                this._helper.setValue('html>body', quizQuestionFields.question)
                this._browser.frameParent();
            });
            if (quizQuestionFields.uploads_to_question) {
                quizQuestionFields.uploads_to_question.map(x => this._helper.uploadFilesToKendo(x));
            }
            this._helper.setValue('#q-points', (quizQuestionFields.points_awarded || '').toString())
                .pause(500)
                .click('.add-answer-link.ms-heroCommandLink') //add new answer
                .waitForElementPresent('.answer-ordering.k-grid-edit-row', Constants.Timeouts.Medium) //add new answer
            this._helper.setValue('#multi-answers-grid > table > tbody > tr.answer-ordering.k-grid-edit-row > td.answer-text-td > input', quizQuestionFields.answer) //add new answer
                .click('span.icon-save2')
                .click('div.dialog-button-set > input#save-button')
                //.waitForElementPresent('.quizCreatorTd.quizTreeTd', Constants.Timeouts.Medium)      
                .pause(1000);
        }
        return this;
    }

    private addMatching(quizQuestionFields: QuizQuestionFields): QuizCreator {
        if (quizQuestionFields) {
            this._browser
                .moveToElement('.spo-emphasis-background.matching-question-icon', 10, 10)
                .mouseButtonDown('left')
                .moveToElement('.quiz-tree-section.spo-dialog-border', 10, 10)
                .mouseButtonUp('left')
                .waitForElementVisible('#question-designer-dialog', Constants.Timeouts.Large)
            this._helper.setValue('#q-title', quizQuestionFields.question_name)
            this._helper.goToiFrame('iframe.k-content', (frame) => {
                this._helper.setValue('html>body', quizQuestionFields.question)
                this._browser.frameParent();
            });
            if (quizQuestionFields.uploads_to_question) {
                quizQuestionFields.uploads_to_question.map(x => this._helper.uploadFilesToKendo(x));
            }
            this._helper.setValue('#q-points', (quizQuestionFields.points_awarded || '').toString())
                .pause(500)
                .click('.add-answer-link.ms-heroCommandLink') //add new answer
                .waitForElementPresent('.matching-answer-row.k-grid-edit-row', Constants.Timeouts.Large) //add new answer
                .setValue('#multi-answers-grid > table > tbody > tr.matching-answer-row.k-grid-edit-row > td:nth-child(1) > div', quizQuestionFields.answer); //add left answer
            if (quizQuestionFields.matching_image) {
                this._browser
                    //.waitForElementVisible('.k-window-titleless:visible', Constants.Timeouts.Large)              
                    .waitForElementVisible('.k-window-titleless:not([style*="display: none"]) .k-Upload', Constants.Timeouts.Large)
                    .click('.k-window-titleless:not([style*="display: none"]) .k-Upload') //upload image
                    .waitForElementVisible('input#imageUpload', Constants.Timeouts.Large)
                    .setValue('input#imageUpload', quizQuestionFields.matching_image)
                    .waitForElementVisible('.ms-ButtonHeightWidth.uploadFile-upload', Constants.Timeouts.Large)
                    .click('.ms-ButtonHeightWidth.uploadFile-upload')
                    .pause(Constants.Timeouts.Medium);
            }
            this._browser
                .setValue('#multi-answers-grid > table > tbody > tr.matching-answer-row.k-grid-edit-row > td:nth-child(2) > div', quizQuestionFields.answer) //add right answer
                .click('span.icon-save2')
                .click('div.dialog-button-set > input#save-button')
                .pause(1000)

        }
        return this;
    }

    private addHotSpot(quizQuestionFields: QuizQuestionFields): QuizCreator {
        if (quizQuestionFields) {
            // this._browser
            //     .moveToElement('.spo-emphasis-background.true-or-false-question-icon', 10, 10)
            //     .mouseButtonDown('left')
            //     .moveToElement('.quiz-tree-section.spo-dialog-border', 10, 10)
            //     .mouseButtonUp('left')
            //     .waitForElementVisible('#question-designer-dialog', Constants.Timeouts.Large)            
            this._helper.setValue('#q-title', quizQuestionFields.question_name)
            this._helper.goToiFrame('iframe.k-content', (frame) => {
                this._helper.setValue('html>body', quizQuestionFields.question)
                this._browser.frameParent();
            });
            if (quizQuestionFields.uploads_to_question) {
                quizQuestionFields.uploads_to_question.map(x => this._helper.uploadFilesToKendo(x));
            }
            this._browser
                .clearValue('#q-points');
            this._helper.setValue('#q-points', (quizQuestionFields.points_awarded || '').toString())
                .click('div.dialog-button-set > input#save-button')
                .pause(500);
        }
        return this;
    }

    private addShortAnswer(quizQuestionFields: QuizQuestionFields): QuizCreator {
        if (quizQuestionFields) {
            // this._browser
            //     .moveToElement('.spo-emphasis-background.true-or-false-question-icon', 10, 10)
            //     .mouseButtonDown('left')
            //     .moveToElement('.quiz-tree-section.spo-dialog-border', 10, 10)
            //     .mouseButtonUp('left')
            //     .waitForElementVisible('#question-designer-dialog', Constants.Timeouts.Large)
            this._helper.setValue('#q-title', quizQuestionFields.question_name)
            this._helper.goToiFrame('iframe.k-content', (frame) => {
                this._helper.setValue('html>body', quizQuestionFields.question)
                this._browser.frameParent();
            });
            if (quizQuestionFields.uploads_to_question) {
                quizQuestionFields.uploads_to_question.map(x => this._helper.uploadFilesToKendo(x));
            }
            this._browser
                .clearValue('#q-points');
            this._helper.setValue('#q-points', (quizQuestionFields.points_awarded || '').toString())
                .click('div.dialog-button-set > input#save-button')
                .pause(500);
        }
        return this;
    }

    private addFreeAnswer(quizQuestionFields: QuizQuestionFields): QuizCreator {
        if (quizQuestionFields) {
            // this._browser
            //     .moveToElement('.spo-emphasis-background.true-or-false-question-icon', 10, 10)
            //     .mouseButtonDown('left')
            //     .moveToElement('.quiz-tree-section.spo-dialog-border', 10, 10)
            //     .mouseButtonUp('left')
            //     .waitForElementVisible('#question-designer-dialog', Constants.Timeouts.Large)
            this._helper.setValue('#q-title', quizQuestionFields.question_name)
            this._helper.goToiFrame('iframe.k-content', (frame) => {
                this._helper.setValue('html>body', quizQuestionFields.question)
                this._browser.frameParent();
            });
            if (quizQuestionFields.uploads_to_question) {
                quizQuestionFields.uploads_to_question.map(x => this._helper.uploadFilesToKendo(x));
            }
            this._browser
                .clearValue('#q-points');
            this._helper.setValue('#q-points', (quizQuestionFields.points_awarded || '').toString())
                .click('div.dialog-button-set > input#save-button')
                .pause(500);
        }
        return this;
    }

    private addFillGap(quizQuestionFields: QuizQuestionFields): QuizCreator {
        if (quizQuestionFields) {
            // this._browser
            //     .moveToElement('.spo-emphasis-background.true-or-false-question-icon', 10, 10)
            //     .mouseButtonDown('left')
            //     .moveToElement('.quiz-tree-section.spo-dialog-border', 10, 10)
            //     .mouseButtonUp('left')
            //     .waitForElementVisible('#question-designer-dialog', Constants.Timeouts.Large)
            this._helper.setValue('#q-title', quizQuestionFields.question_name)
            this._helper.goToiFrame('iframe.k-content', (frame) => {
                this._helper.setValue('html>body', quizQuestionFields.question)
                this._browser.frameParent();
            });
            if (quizQuestionFields.uploads_to_question) {
                quizQuestionFields.uploads_to_question.map(x => this._helper.uploadFilesToKendo(x));
            }
            this._browser
                .clearValue('#q-points');
            this._helper.setValue('#q-points', (quizQuestionFields.points_awarded || '').toString())
                .click('div.dialog-button-set > input#save-button')
                .pause(500);
        }
        return this;
    }

    public goToCreationPage(): QuizCreator {
        this._browser
            .useCss()
            .waitForElementPresent('.k-grid-content.k-auto-scrollable', Constants.Timeouts.Large)
            .click('a.ms-heroCommandLink.actionItemLink')
            .waitForElementVisible('.quizCreatorTd.quizTreeTd', Constants.Timeouts.Large)
        return this;
    }

    public goToEditingPage(quiz_name): QuizCreator {
        this._browser
            .useXpath().waitForElementPresent(`//tr[td[contains(text(),"${quiz_name}")]]//a[@class="actions-link calloutCallLink"]`, Constants.Timeouts.Large)
            .click(`//tr[td[contains(text(),"${quiz_name}")]]//a[@class="actions-link calloutCallLink"]`)
            .waitForElementPresent("//*[contains(@data-icon-name,'Edit')]", Constants.Timeouts.Medium)
            .click("//*[contains(@data-icon-name,'Edit')]")
            .useCss()
        return this;
    }

    public deleteQuiz(quiz_name): QuizCreator {
        this._browser
            .waitForElementPresent("//i[contains(@data-icon-name,'Trash')]", Constants.Timeouts.Large)
            .click("//i[contains(@data-icon-name,'Trash')]")
            .useCss()
            .waitForElementVisible('iframe.k-content-frame', Constants.Timeouts.Large)
        this._helper.goToiFrame('iframe.k-content-frame', (frame) => {
            this._browser
                .waitForElementVisible('input#saveChanges', Constants.Timeouts.Large)
                .click('input#saveChanges') // delete quiz
                .frameParent();
        });
        return this;
    }
    public filterQuizInQuizStorage(quiztitle): void {
        this._browser
        .useXpath()
        .waitForElementVisible(`//tr[td[contains(text(),"quiz")]]`, Constants.Timeouts.Huge, true)
        .moveToElement('//th[contains(@data-field, "Title")]//span[contains(@class, "k-icon")]', 5, 5)
        .click('//th[contains(@data-field, "Title")]//span[contains(@class, "k-icon")]')
        .waitForElementVisible('//input[contains(@data-bind, "value:filters[0].value")]', Constants.Timeouts.Large)
        .click('//input[contains(@data-bind, "value:filters[0].value")]')
        .clearValue('//input[contains(@data-bind, "value:filters[0].value")]')
        .setValue('//input[contains(@data-bind, "value:filters[0].value")]', quiztitle)
        .waitForElementVisible('//button[contains(@class, "k-primary")]', Constants.Timeouts.Large)
        .click('//button[contains(@class, "k-primary")]')
    }

    public openQuizManagement(quiztitle): void {
        this._browser
        .waitForElementVisible(`//tr[td[contains(text(),"${quiztitle}")]]//a[@class="actions-link calloutCallLink"]`, Constants.Timeouts.Large)
        .click(`//tr[td[contains(text(),"${quiztitle}")]]//a[@class="actions-link calloutCallLink"]`)

    }
}

