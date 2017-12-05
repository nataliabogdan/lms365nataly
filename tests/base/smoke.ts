import { NightWatchBrowser as Browser } from 'nightwatch';
import { Constants } from '../../infrastructure/constants';
import { Helper } from '../../infrastructure/helpers/helper';
import { GuidGenerator } from '../../infrastructure/guid-generator';
import { QuizFields, QuizQuestionFields, QuetionType } from '../../infrastructure/models';
import { LearningItemType } from '../../infrastructure/models';

let helper: Helper;
let courseKey: string;
let elearningTitle: string;
// let updElearningTitle: string;
let classroomTitle: string;
let lptitle: string;
let quizLM: string;
let scormLM: string;
let trainingPlanTitle: string;
let roomClassroom: string;
// let roomWebinar: string;


export = {
    before: (browser: Browser) => {
        helper = new Helper(browser);
        courseKey = GuidGenerator.instance.generate();
        elearningTitle = `EL_${courseKey}`;
        // updElearningTitle = `UP_EL_${courseKey}`;
        classroomTitle = `CL_${courseKey}`;
        lptitle = `LP_${courseKey}`;
        quizLM = `quiz_LM_${courseKey}`;
        scormLM = `scorm_LM_${courseKey}`;
        trainingPlanTitle = `TP_${courseKey}`;
        roomClassroom = `CL_room_${courseKey}`;
        // roomWebinar = `WB_room_${courseKey}`;

        helper.user.loginAsLMSAdmin();

    },
    beforeEach: (browser: Browser) => {
    },

    after: (browser: Browser) => {
        browser.end();
    },


    'Upload scorm package to storage.': () => {     //works
        console.log('Scorm creation' + scormLM);
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
        console.log('Quiz creation' + quizLM);
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
                        question_type: QuetionType.trueOrFalse,
                        question_name: `${questionName + key}`,
                        question: `${questionName + key}`,
                        answer: `${questionName + key}`,
                        points_awarded: 5,
                    } as QuizQuestionFields,

                ],
            } as QuizFields)
            .save();
    },

    'Create eLearning': () => {
        console.log('Elearning creation' + elearningTitle);  //works
        helper.navigation.goToCourseCatalog();
        helper.courseCreator
            .goToCreationPageElearning()
            .create({
                category: 'cat',
                description: 'Some description',
                title: elearningTitle,
                url: elearningTitle,
                // selectContentPackage: scormLM,
                // selectQuizz: quizLM
            });
    },
    'Create classroom': () => {
        console.log('Classroom creation' + classroomTitle);     //works
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

    'Create Published Learning Module on eLEarning Course': () => {  //works
        console.log('LP creation' + lptitle);
        let key = GuidGenerator.instance.generate();
        helper.navigation.goToLearningPath();
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
                }
            ]
        });
        helper.learningPathCreator
            .checkLPInList(lptitle)
    },

    'Create  Training Plan with required fields filled.': () => {
        console.log('TP creation' + trainingPlanTitle);
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
    
    'Create Course Session for Classroom Course': () => {
        console.log('Course Sessio creation');
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

    ' Delete Learning Module from eLearning Course': () => {
        console.log('LM removal ' + lptitle);
        helper.navigation.goToLearningPath();
        helper.learningPathCreator.deleteLp(lptitle)
        helper.learningPathCreator.checkLPNotInList(lptitle)
    },

    'Delete scorm package from storage.': () => {
        console.log('SCORM removal ' + scormLM);
        helper.navigation.goToScorm();
        helper.scormCreator.goToScormStoragelistNewNav()
        helper.scormCreator.openDeleteForm(scormLM)
        helper.scormCreator.checkScormNotInList(scormLM);
    },

    'Delete quiz': () => {
        console.log('Quiz removal ' + quizLM);
        helper.navigation.goToQuizStorage();
        helper.browser.refresh();
        helper.quizCreator.filterQuizInQuizStorage(quizLM)
        helper.quizCreator.openQuizManagement(quizLM)
        helper.quizCreator.deleteQuiz(quizLM)
        helper.browser.useCss().waitForElementPresent('.k-grid.k-widget', Constants.Timeouts.Huge)
    },

    'Delete eLearning': () => {
        console.log('eLearning removal ' + elearningTitle);
        helper.navigation.goToCourseCatalog();
        helper.courseEditor.filterByCourseTitle(elearningTitle)
        helper.courseEditor.OpenCourseManagement();
        helper.courseDeletion.DeleteCourse(elearningTitle);
    },
    'Delete Classroom': () => {
        console.log('Classroom removal ' + classroomTitle);
        helper.navigation.goToCourseCatalog();
        helper.courseEditor.filterByCourseTitle(classroomTitle);
        helper.courseEditor.OpenCourseManagement();
        helper.courseDeletion.DeleteCourse(classroomTitle);
    },
}