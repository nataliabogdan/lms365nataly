import { NightWatchBrowser as Browser } from 'nightwatch';
import { CourseCreator } from '../course-creator';
import { CourseEditor } from '../course-edit'
import { CourseDeletion } from '../course-deletion'
import { TrainingPlanCreator } from '../../tests/trainingplan-creation/trainingplan-creator'
import { TrainingPlanEditor } from '../../tests/trainingplan-creation/trainingplan-editor';
import { ScormCreator } from '../scorm-creator';
import { LearningPathCreator } from '../learningpath-creator';
import { AssignmentCreator } from '../assignment-creator';
import { QuizCreator } from '../quiz-creator';
import { Uploads, UploadType } from '../models';
import { Constants } from '../constants';
import { NavigationHelper } from './navigation-helper';
import { UserHelper } from './user-helper';
import { HelperBase } from './helper-base';
import { MlwpHelper} from '../mlwp';
import {CourseSessionCreator} from '../course-session-creator'


export class Helper extends HelperBase {
    private _courseCreator: CourseCreator;
    private _courseEditor: CourseEditor;
    private _courseDeletion: CourseDeletion;
    private _TrainingPlanCreation: TrainingPlanCreator;
    private _TrainingPlanEditor: TrainingPlanEditor;
    private _scormCreator: ScormCreator;
    private _learningPathCreator: LearningPathCreator;
    private _assignmentCreator: AssignmentCreator;
    private _quizCreator: QuizCreator;
    private _navigationHelper: NavigationHelper;
    private _userHelper: UserHelper;
    private _mlwpHelper: MlwpHelper;
    private _courseSessionCreator: CourseSessionCreator;

    public constructor(browser: Browser) {
        super(browser);
        this._navigationHelper = new NavigationHelper(browser);
        this._userHelper = new UserHelper(browser);
    }

    public get navigation(): NavigationHelper {
        return this._navigationHelper;
    }

    public get user(): UserHelper {
        return this._userHelper;
    }

    public get courseCreator(): CourseCreator {
        return this._courseCreator = this._courseCreator || new CourseCreator(this.browser);
    }

    public get courseEditor(): CourseEditor {
        return this._courseEditor = this._courseEditor || new CourseEditor(this.browser);
    }

    public get courseDeletion(): CourseDeletion {
        return this._courseDeletion = this._courseDeletion || new CourseDeletion(this.browser);
    }

    public get TrainingPlanCreation(): TrainingPlanCreator {
        return this._TrainingPlanCreation = this._TrainingPlanCreation || new TrainingPlanCreator(this.browser);
    }

    public get TrainingPlanEditor(): TrainingPlanEditor {
        return this._TrainingPlanEditor = this._TrainingPlanEditor || new TrainingPlanEditor(this.browser);
    }

    public get scormCreator(): ScormCreator {
        return this._scormCreator = this._scormCreator || new ScormCreator(this.browser);
    }

    public get learningPathCreator(): LearningPathCreator {
        return this._learningPathCreator = this._learningPathCreator || new LearningPathCreator(this.browser);
    }

    public get assignmentCreator(): AssignmentCreator {
        return this._assignmentCreator = this._assignmentCreator || new AssignmentCreator(this.browser);
    }

    public get quizCreator(): QuizCreator {
        return this._quizCreator = this._quizCreator || new QuizCreator(this.browser);
    }

    public get mlwpHelper(): MlwpHelper {
        return this._mlwpHelper = this._mlwpHelper || new MlwpHelper(this.browser);
    }
    public get courseSessionCreator(): CourseSessionCreator {
        return this._courseSessionCreator = this._courseSessionCreator || new CourseSessionCreator(this.browser);
    }


    //methods

    //helps to overcome problems with not fully filled inputs
    public setValue(selector: string, value: string, callback?: () => void): Browser {
        this.browser.clearValue(selector);
        this.browser.setValue(selector, value, () => {
            if (callback) {
                callback();
            }
        });
        return this.browser;
    }

    public switchToClassicMode(): void {//switching to Classic Sharepoint mode moethod
        this.browser.setCookie({
            name: "splnu",
            value: "0",
        });
        this.browser.refresh();
    }

    public returnToWindow(): void {
        this.browser
            .windowHandles(function (result) {
                let mainWindow = result.value[0];
                this.switchWindow(mainWindow);
            });
    }

    public goToiFrame(iframeCssSelector: string, callBack: (frame) => any): HelperBase {
        this.browser.element('css selector', iframeCssSelector, (frame) => {
            (this.browser as any).frame({ ELEMENT: frame.value.ELEMENT }, () => {
                if (callBack) {
                    callBack(frame);
                }
            });
        });
        return this;
    }

    // public toggleCheckbox(checkbox: string): HelperBase {
    //     this.browser
    //         .execute((data) => {
    //             document.getElementById(data).parentElement.click();
    //         }, [checkbox]);
    //     return this;
    // }

    public toggleCheckbox(needToSelect: boolean, id: string): HelperBase {
        this.browser.element('css selector', '#'+ id, (response) => {
            this.browser.elementIdSelected(response.value.ELEMENT, (result) => {
                    if ((needToSelect == true && result.value == false) || (needToSelect == false && result.value == true)) {
                        this.browser
                            .execute((data) => {
                                document.getElementById(data).parentElement.click();
                            }, [id]);
                    }
                });
            });
        return this;
    }

    public uploadFilesToKendo(upload: Uploads) {  //to upload content to kendo forms                
                        switch(upload.uploadType) {
            case UploadType.YouTube: 
                        this.browser.click('.k-tool-icon.k-Insert.YouTube') //insert youtube
                this.setValue('#videoUrl', upload.file_path)
                // .execute(function(){
                //     (document.getElementById('videoUrl') as any).value = Constants.Urls.YouTubeURL;
                // })
                this.browser
                            .pause(2000)
                            .useXpath().click('//input[@value="Insert"]').useCss()
                            .pause(Constants.Timeouts.Medium)            
                break;
                        case UploadType.video: 
                        this.browser
                            .click('.k-tool-icon.k-Upload.Video') //upload video
                            .waitForElementVisible('input.k-input.k-textbox.editor-file-upload-input', Constants.Timeouts.Large)
                            .setValue('input.k-input.k-textbox.editor-file-upload-input', upload.file_path)
                            .pause(2000)
                            .useXpath()
                            .waitForElementVisible('//input[@value="Upload"]', Constants.Timeouts.Large)
                            .click('//input[@value="Upload"]').useCss()
                            .pause(Constants.Timeouts.Large)
                break;
                        case UploadType.audio:
                        this.browser
                            .click('.k-tool-icon.k-Upload.Audio') //upload audio
                            .waitForElementVisible('input.k-input.k-textbox.editor-file-upload-input', Constants.Timeouts.Large)
                            .setValue('input.k-input.k-textbox.editor-file-upload-input', upload.file_path)
                            .pause(2000)
                            .useXpath()
                            .waitForElementVisible('//input[@value="Upload"]', Constants.Timeouts.Large)
                            .click('//input[@value="Upload"]').useCss()
                            .pause(Constants.Timeouts.Large)
                break;
                        case UploadType.image:
                        this.browser
                            .click('.k-tool-icon.k-Upload.Image') //upload image
                            .waitForElementVisible('input.k-input.k-textbox.editor-file-upload-input', Constants.Timeouts.Large)
                            .setValue('input.k-input.k-textbox.editor-file-upload-input', upload.file_path)
                            .pause(2000)
                            .useXpath()
                            .waitForElementVisible('//input[@value="Upload"]', Constants.Timeouts.Large)
                            .click('//input[@value="Upload"]').useCss()
                            .pause(Constants.Timeouts.Medium)
                break;
                        case UploadType.file:
                        this.browser
                            .click('.k-tool-icon.k-Upload.File') //upload file
                            .waitForElementVisible('input.k-input.k-textbox.editor-file-upload-input', Constants.Timeouts.Large)
                            .setValue('input.k-input.k-textbox.editor-file-upload-input', upload.file_path)
                            .pause(2000)
                            .useXpath()
                            .waitForElementVisible('//input[@value="Upload"]', Constants.Timeouts.Large)
                            .click('//input[@value="Upload"]').useCss()
                            .pause(Constants.Timeouts.Medium);
                        break;
                    }
    }
}
