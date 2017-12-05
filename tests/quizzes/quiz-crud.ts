import { NightWatchBrowser as Browser } from 'nightwatch';
import { Constants } from '../../infrastructure/constants';
import { Helper } from '../../infrastructure/helpers/helper';
import { QuizFields, QuizQuestionFields, QuetionType, Uploads, UploadType } from '../../infrastructure/models';
import { GuidGenerator } from '../../infrastructure/guid-generator';

let helper: Helper;
let quiz_name: string = 'Quiz:';
let key = GuidGenerator.instance.generate();
declare const WORKING_PATH: string;

export = {
    before: (browser: Browser) => {
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();
        helper.navigation.goToQuizStorage();

    },
    after: (browser: Browser) => {
        browser.end();
    },

    'Create quiz with all question types, allow review, show correct answers and upload content into question': () => {

        helper.quizCreator
            .goToCreationPage()
            .create({
                title: `${quiz_name + key}`,
                description: `${quiz_name + key}`,
                quiz_passing_score: 100,
                max_attempts: 5,
                allow_review: true,
                show_correct_answers: true,
                questions: [
                    {
                        question_type: QuetionType.multipleChoise,
                        question_name: `${quiz_name + key}`,
                        question: `${quiz_name + key}`,
                        answer: `${quiz_name + key}`,
                        points_awarded: 5,
                    } as QuizQuestionFields,
                    {
                        question_type: QuetionType.multipleAnswers,
                        question_name: `${quiz_name + key}`,
                        question: `${quiz_name + key}`,
                        answer: `${quiz_name + key}`,
                        points_awarded: 5,
                    } as QuizQuestionFields,
                    {
                        question_type: QuetionType.trueOrFalse,
                        question_name: `${quiz_name + key}`,
                        question: `${quiz_name + key}`,
                        answer: `${quiz_name + key}`,
                        points_awarded: 5,
                        uploads_to_question: [
                            {
                                uploadType: UploadType.YouTube,
                                file_path: 'https://youtu.be/iUdeS4RVhYQ',
                            } as Uploads,
                            {
                                uploadType: UploadType.video,
                                file_path: `${WORKING_PATH}/files/video-small.mov`,
                            } as Uploads,
                            {
                                uploadType: UploadType.audio,
                                file_path: `${WORKING_PATH}/files/audio.mp3`,
                            } as Uploads,
                            {
                                uploadType: UploadType.image,
                                file_path: `${WORKING_PATH}/files/image.png`,
                            } as Uploads,
                            {
                                uploadType: UploadType.file,
                                file_path: `${WORKING_PATH}/files/file.pdf`,
                            } as Uploads,
                        ]
                    } as QuizQuestionFields,
                    {
                        question_type: QuetionType.ordering,
                        question_name: `${quiz_name + key}`,
                        question: `${quiz_name + key}`,
                        answer: `${quiz_name + key}`,
                        points_awarded: 5,
                    } as QuizQuestionFields,
                    {
                        question_type: QuetionType.matching,
                        question_name: `${quiz_name + key}`,
                        question: `${quiz_name + key}`,
                        answer: `${quiz_name + key}`,
                        points_awarded: 5,
                        matching_image: `${WORKING_PATH}/files/image.png`,
                    } as QuizQuestionFields,
                ],
            } as QuizFields)
            .save();
    },

    'Check required fields in quiz and questions creation': () => {

        helper.quizCreator
            .goToCreationPage()
            .create({
                title: '',
                description: '',
                quiz_passing_score: null,
                questions: [
                    {
                        question_type: QuetionType.multipleChoise,
                        question_name: '',
                        question: '',
                        answer: '',
                        points_awarded: null,
                    } as QuizQuestionFields,
                ],
            } as QuizFields)
        helper.browser
            .isVisible('span#Title_validationMessage')
            .isVisible('span#rich-text-editor_validationMessage')
            .isVisible('span#Text_validationMessage')
            .isVisible('span#Points_validationMessage')
            .click('input#cancel-button') //cancel creation
            .pause(500);

        helper.quizCreator
            .create({
                title: '',
                description: '',
                quiz_passing_score: null,
                questions: [
                    {
                        question_type: QuetionType.multipleAnswers,
                        question_name: '',
                        question: '',
                        answer: '',
                        points_awarded: null,
                    } as QuizQuestionFields,
                ],
            } as QuizFields)
        helper.browser
            .isVisible('span#Title_validationMessage')
            .isVisible('span#rich-text-editor_validationMessage')
            .isVisible('span#Text_validationMessage')
            .isVisible('span#Points_validationMessage')
            .click('input#cancel-button') //cancel creation
            .pause(500);

        helper.quizCreator
            .create({
                title: '',
                description: '',
                quiz_passing_score: null,
                questions: [
                    {
                        question_type: QuetionType.trueOrFalse,
                        question_name: '',
                        question: '',
                        answer: '',
                        points_awarded: null,
                    } as QuizQuestionFields,
                ],
            } as QuizFields)
        helper.browser
            .isVisible('span#Title_validationMessage')
            .isVisible('span#rich-text-editor_validationMessage')
            .isVisible('span#Points_validationMessage')
            .click('input#cancel-button') //cancel creation
            .pause(500);

        helper.quizCreator
            .create({
                title: '',
                description: '',
                quiz_passing_score: null,
                questions: [
                    {
                        question_type: QuetionType.ordering,
                        question_name: '',
                        question: '',
                        answer: '',
                        points_awarded: null,
                    } as QuizQuestionFields,
                ],
            } as QuizFields)
        helper.browser
            .isVisible('span#Title_validationMessage')
            .isVisible('span#rich-text-editor_validationMessage')
            .isVisible('span#Text_validationMessage')
            .isVisible('span#Points_validationMessage')
            .click('input#cancel-button') //cancel creation
            .pause(500);

        helper.quizCreator
            .create({
                title: '',
                description: '',
                quiz_passing_score: null,
                questions: [
                    {
                        question_type: QuetionType.matching,
                        question_name: '',
                        question: '',
                        answer: '',
                        points_awarded: null,
                    } as QuizQuestionFields,
                ],
            } as QuizFields)
        helper.browser
            .isVisible('span#Title_validationMessage')
            .isVisible('span#rich-text-editor_validationMessage')
            .isVisible('#_validationMessage') //need to separate two answers
            .isVisible('#_validationMessage')
            .isVisible('span#Points_validationMessage')
            .click('input#cancel-button') //cancel creation
            .pause(500);

        helper.quizCreator.save()
        helper.browser
            .isVisible('#Title_validationMessage')
            .isVisible('#PassingPercentage_validationMessage')
            .isVisible('#QuestionViewModels_validationMessage')
            .pause(500)
            .click('#cancel-button') //cancel creation
            .acceptAlert() //do not save changes
            .waitForElementPresent('.k-grid.k-widget', Constants.Timeouts.Large);
    },

    'Change title and description in quiz editing': () => {
        helper.quizCreator
            .goToEditingPage(`${quiz_name + key}`)
            .create({
                title: `${quiz_name + key}`,
                description: `${quiz_name + key}`,
                quiz_passing_score: 20,
            })
            .save()
        helper.browser.waitForElementPresent('.k-grid.k-widget', Constants.Timeouts.Large);
    },

    'Delete quiz': () => {
        helper.quizCreator.deleteQuiz(`${quiz_name + key}`)
        helper.browser.useCss().waitForElementPresent('.k-grid.k-widget', Constants.Timeouts.Large)
    },
}