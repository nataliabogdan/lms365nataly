import { NightWatchBrowser as Browser } from 'nightwatch';
import { Constants } from '../../infrastructure/constants';
import { Helper } from '../../infrastructure/helpers/helper';
import { GuidGenerator } from '../../infrastructure/guid-generator';
import { QuizFields, QuizQuestionFields, QuetionType } from '../../infrastructure/models';
import { LearningItemType } from '../../infrastructure/models';
// declare const WORKING_PATH: string;

let helper: Helper;
let courseKey: string;
let elearningTitle: string;
let updElearningTitle: string;
let classroomTitle: string;
let updClassroomTitle: string;
let webinarTitle: string;
let updWebinarTitle: string;
let lptitle: string;
let scormTitle: string;
let quiztitle: string
let quizLM: string;
let scormLM: string;
let trainingPlanTitle: string;
let roomClassroom: string;
let roomWebinar: string;


export = {
    before: (browser: Browser) => {
        helper = new Helper(browser);
        courseKey = GuidGenerator.instance.generate();
        elearningTitle = `EL_${courseKey}`;
        updElearningTitle = `UP_EL_${courseKey}`;
        classroomTitle = `CL_${courseKey}`;
        updClassroomTitle = `UP_CL_${courseKey}`;
        webinarTitle = `WB_${courseKey}`;
        updWebinarTitle = `UP_WB_${courseKey}`;
        lptitle = `LP_${courseKey}`;
        scormTitle = `SC_${courseKey}`;
        quiztitle = `quiz_smoke_${courseKey}`;
        quizLM = `quiz_LM_${courseKey}`;
        scormLM = `scorm_LM_${courseKey}`;
        trainingPlanTitle = `TP_${courseKey}`;
        roomClassroom = `CL_room_${courseKey}`;
        roomWebinar = `WB_room_${courseKey}`;

        helper.user.loginAsLMSAdmin();

    },
    beforeEach: (browser: Browser) => {
    },

    after: (browser: Browser) => {
        browser.end();
    },

    'Upload scorm package to storage.': () => {     //works
        console.log('Scorm creation');
        helper.navigation.goToScorm();
        helper.scormCreator.goToScormStoragelistNewNav()

        helper.scormCreator.createScorm({
            title: scormLM,
            description: scormLM,
            showToc: true,
            showNavigation: true,
            openInNewWindow: true
        })
        helper.scormCreator.checkScormInList(scormLM);
    },

    'Create quiz': () => {                   //works
        console.log('Quiz creation');
        let key = GuidGenerator.instance.generate();
        const questionName = `question_smoke`

        helper.navigation.goToQuizStorage();
        helper.quizCreator
            .goToCreationPage()
            .create({
                title: quizLM,
                description: `${questionName + key}`,
                quiz_passing_score: 100,
                max_attempts: 5,
                allow_review: true,
                show_correct_answers: true,
                questions: [
                    {
                        question_type: QuetionType.multipleChoise,
                        question_name: `${questionName + key}`,
                        question: `${questionName + key}`,
                        answer: `${questionName + key}`,
                        points_awarded: 5,
                    } as QuizQuestionFields,
                    {
                        question_type: QuetionType.multipleAnswers,
                        question_name: `${questionName + key}`,
                        question: `${questionName + key}`,
                        answer: `${questionName + key}`,
                        points_awarded: 5,
                    } as QuizQuestionFields,
                    {
                        question_type: QuetionType.trueOrFalse,
                        question_name: `${questionName + key}`,
                        question: `${questionName + key}`,
                        answer: `${questionName + key}`,
                        points_awarded: 5,
                    } as QuizQuestionFields,
                    {
                        question_type: QuetionType.ordering,
                        question_name: `${questionName + key}`,
                        question: `${questionName + key}`,
                        answer: `${questionName + key}`,
                        points_awarded: 5,
                    } as QuizQuestionFields,
                    {
                        question_type: QuetionType.matching,
                        question_name: `${questionName + key}`,
                        question: `${questionName + key}`,
                        answer: `${questionName + key}`,
                        points_awarded: 5,
                    } as QuizQuestionFields,
                ],
            } as QuizFields)
            .save();
    },

    'Create eLearning': () => {   //works
        helper.navigation.goToCourseCatalog();
        helper.courseCreator
            .goToCreationPageElearning()
            .create({
                category: 'cat',
                description: 'Some description',
                title: elearningTitle,
                url: elearningTitle,
                selectContentPackage: scormLM,
                selectQuizz: quizLM
            });
    },

    'Create classroom': () => {          //works
        helper.navigation.goToCourseCatalog();
        helper.courseCreator
            .goToCreationPageClassroom()
            .create({
                title: classroomTitle,
                description: classroomTitle,
                category: classroomTitle,
                url: classroomTitle
            });
    },

    'Create  webinar': () => {      //works
        helper.navigation.goToCourseCatalog();
        helper.courseCreator
            .goToCreationPageWebinar()
            .create({
                title: webinarTitle,
                description: webinarTitle,
                category: webinarTitle,
                url: webinarTitle
            });
        helper.browser.waitForElementPresent('div.courseCreatedLinksBlock', Constants.Timeouts.Medium);
    },

    'Create  Training Plan with required fields filled.': () => {
        helper.navigation.goToCourseCatalog();
        helper.navigation.goToTrainingPlanList();
        helper.TrainingPlanCreation.goToCreationPageTrainingPlan()
        helper.TrainingPlanCreation.create({                                               //select courses method is used in .create method
            title: trainingPlanTitle,
            description: trainingPlanTitle,
            category: trainingPlanTitle,
            url: trainingPlanTitle,
            numberCourses: 2
        });

        helper.browser.waitForElementPresent('div.courseCreatedLinksBlock', Constants.Timeouts.Medium);
    },


    'Edit eLearning with learner enrollment': () => {    //works
        helper.navigation.goToCourseCatalog();
        helper.courseEditor.filterByCourseTitle(elearningTitle);
        helper.courseEditor.OpenCourseManagement();
        helper.courseEditor.editCourseForm();
        helper.courseEditor.edit({
            category: 'cat1',
            description: 'New description',
            title: updElearningTitle,
            learners: Constants.Users.Learner.loginName
        });
    },

    'Edit Webinar with learner enrollment': () => {    //works
        helper.navigation.goToCourseCatalog();
        helper.courseEditor.filterByCourseTitle(webinarTitle);
        helper.courseEditor.OpenCourseManagement();
        helper.courseEditor.editCourseForm();
        helper.courseEditor.edit({
            category: updWebinarTitle,
            description: updWebinarTitle,
            title: updWebinarTitle,
        });
    },

    'Edit Classroom with learner enrollment': () => {    //works
        helper.navigation.goToCourseCatalog();
        helper.courseEditor.filterByCourseTitle(classroomTitle);
        helper.courseEditor.OpenCourseManagement();
        helper.courseEditor.editCourseForm();
        helper.courseEditor.edit({
            category: updClassroomTitle,
            description: updClassroomTitle,
            title: updClassroomTitle,
        });
    },

    'Create Course Session for Webinar Course': () => {
        helper.navigation.goToCourseCatalog();
        helper.courseEditor.filterByCourseTitle(webinarTitle);
        helper.courseEditor.OpenCourseManagement();
        helper.courseSessionCreator.goToManageSession();
        helper.courseSessionCreator
            .goToSessionCreationPage()
            .create({
                learners: Constants.Users.Learner.loginName,
                attendees: '5',
                meetingUrl: 'https://codeacademy.com'
            });
    },

    'Create Course Session for Classroom Course': () => {
        helper.navigation.goToCourseCatalog()
        helper.courseEditor.filterByCourseTitle(classroomTitle);
        helper.courseEditor.OpenCourseManagement();
        helper.courseSessionCreator.goToManageSession();
        helper.courseSessionCreator
            .goToSessionCreationPage()
            .create({
                room: roomClassroom,
                learners: Constants.Users.Learner.loginName,
                attendees: '5'
            });
    },


    'Create Published Learning Module on eLEarning Course': () => {  //works
        console.log('LP creation');
        let key = GuidGenerator.instance.generate();
        helper.navigation.goToCourseCatalog();
        helper.courseEditor.filterByCourseTitle(updElearningTitle);
        helper.courseEditor.OpenCourseManagement();
        helper.courseEditor.ManageLearningModulesOnCourse();
        helper.learningPathCreator
            .goToCreateLearningPathPage()
            .openDocumentList();
        helper.learningPathCreator.create({
            title: lptitle,
            description: `ui-test_${key}`,
            published: true,
            items: [
                {
                    type: LearningItemType.Youtube
                },
                {
                    type: LearningItemType.EmbeddeCode
                },
                {
                    type: LearningItemType.ExternalLink
                },
                {
                    type: LearningItemType.OfficeMix
                },
                {
                    type: LearningItemType.Content
                },
                {
                    type: LearningItemType.LinkToDocument
                },
                {
                    title: quizLM,
                    type: LearningItemType.Quiz
                },
                {
                    title: scormLM,
                    type: LearningItemType.Scorm
                },

            ]
        });

        helper.learningPathCreator
            .checkLPInList(lptitle)

    },

    ' Update Learning Module for eLearning Course': () => {
        console.log('LP modification');
        let key = GuidGenerator.instance.generate();
        helper.navigation.goToCourseCatalog();
        helper.courseEditor.filterByCourseTitle(updElearningTitle)
        helper.courseEditor.OpenCourseManagement();
        helper.courseEditor.ManageLearningModulesOnCourse();
        helper.learningPathCreator.openLpEditForm(lptitle)
        helper.learningPathCreator.edit({
            title: lptitle,
            description: `UPD_Description_LM_${key}`,
            items: [
                {
                    type: LearningItemType.OfficeMix
                },
            ]
        })
            .saveLearningPath()
    },

    'Edit created Training Plan.': () => {
        helper.navigation.goToCourseCatalog();
        helper.navigation.goToTrainingPlanList();
        helper.TrainingPlanEditor.filterTrainingPlan(trainingPlanTitle)
        helper.TrainingPlanEditor.OpenTrainingPlanManagement();
        helper.TrainingPlanEditor.openTrainingPlanEditForm();
        helper.TrainingPlanEditor
            .edit({
                title: trainingPlanTitle,
                description: trainingPlanTitle,
                category: trainingPlanTitle,
                numberCourses:4
            });
        helper.browser
            .useXpath()
            .waitForElementPresent('//div[contains(@class, "courseCreatedLinksBlock")]', Constants.Timeouts.Huge)
            helper.navigation.goToTrainingPlanList();
            helper.TrainingPlanEditor.checkTrainingPlanInList(trainingPlanTitle);
    },

    ' Delete Learning Module from eLearning Course': () => {
        console.log('LP deletion');
        helper.navigation.goToCourseCatalog();
        helper.courseEditor.filterByCourseTitle(updElearningTitle)
        helper.courseEditor.OpenCourseManagement();
        helper.courseEditor.ManageLearningModulesOnCourse();
        helper.learningPathCreator.deleteLp(lptitle)
        helper.learningPathCreator.checkLPNotInList(lptitle)

    },

    'Delete scorm package from storage.': () => {

        helper.navigation.goToScorm();
        helper.scormCreator.goToScormStoragelistNewNav()

        helper.scormCreator.openDeleteForm(scormLM)
        helper.scormCreator.checkScormNotInList(scormLM);
    },



    'Delete quiz': () => {
        helper.navigation.goToQuizStorage();
        helper.browser.refresh();
        helper.quizCreator.filterQuizInQuizStorage(quizLM)
        helper.quizCreator.openQuizManagement(quizLM)
        helper.quizCreator.deleteQuiz(quizLM)
        helper.browser.useCss().waitForElementPresent('.k-grid.k-widget', Constants.Timeouts.Huge)
    },

    'Delete eLearning': () => {
        console.log('eLearning removal');
        helper.navigation.goToCourseCatalog();
        helper.courseEditor.filterByCourseTitle(updElearningTitle)
        helper.courseEditor.OpenCourseManagement();
        helper.courseDeletion.DeleteCourse(updElearningTitle);
    },
    'Delete Classroom': () => {
        console.log('Classroom removal');
        helper.navigation.goToCourseCatalog();
        helper.courseEditor.filterByCourseTitle(updClassroomTitle);
        helper.courseEditor.OpenCourseManagement();
        helper.courseDeletion.DeleteCourse(updClassroomTitle);
    },
    'Delete Webinar': () => {
        console.log('Classroom removal');
        helper.navigation.goToCourseCatalog();
        helper.courseEditor.filterByCourseTitle(updWebinarTitle);
        helper.courseEditor.OpenCourseManagement();
        helper.courseDeletion.DeleteCourse(updWebinarTitle);
    },
}
