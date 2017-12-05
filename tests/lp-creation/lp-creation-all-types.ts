import { NightWatchBrowser as Browser } from 'nightwatch';
import { Helper } from '../../infrastructure/helpers/helper';

let helper: Helper;
//declare const WORKING_PATH:string;



export = {
    before: (browser: Browser) => {
        browser.maximizeWindow();
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();
        helper.navigation.goToLearningPath();
    },
    
         after: (browser: Browser) => {
         browser.end();
     },


    // ' Create Failed LP': () => {

    //     helper.browser.pause(2000)
    //     helper.learningPathCreator.goToCreateLearningPathPage();
    //     helper.learningPathCreator.create({
    //         title: `L:FAILED`,
    //         description: `L:FAILED`,

    //     });

    //     helper.learningPathCreator
    //         .togglePublishing()
    //         .addScorm('S:OUT OF ATTEMPT')
    //         .saveLearningPath()
    //         .checkLPInList('L:FAILED')
    // },


    // ' Create NOT STARTED LP': () => {

    //     helper.learningPathCreator.goToCreateLearningPathPage();
    //     helper.learningPathCreator.create({
    //         title: `L:NOT STARTED`,
    //         description: `L:NOT STARTED`,

    //     });

    //     helper.learningPathCreator
    //         .togglePublishing()
    //         .addConfirmation()
    //         .saveLearningPath()
    //         .checkLPInList('L:NOT STARTED')
    // },

    // ' Create COMPLETED1 LP': () => {

    //     helper.learningPathCreator.goToCreateLearningPathPage();
    //     helper.learningPathCreator.create({
    //         title: `L:COMPLETED1`,
    //         description: `L:COMPLETED1`,

    //     });

    //     helper.learningPathCreator
    //         .togglePublishing()
    //         .addConfirmation()
    //         .saveLearningPath()
    //         .checkLPInList('L:COMPLETED1')
    // },

    // ' Create COMPLETED2 LP': () => {

    //     helper.learningPathCreator.goToCreateLearningPathPage();
    //     helper.learningPathCreator.create({
    //         title: `L:COMPLETED2`,
    //         description: `L:COMPLETED2`,

    //     });

    //     helper.learningPathCreator
    //         .togglePublishing()
    //         .addConfirmation()
    //         .saveLearningPath()
    //         .checkLPInList('L:COMPLETED2')
    // },

    // ' Create L:CONTINUE LP': () => {

    //     helper.learningPathCreator.goToCreateLearningPathPage();
    //     helper.learningPathCreator.create({
    //         title: `L:CONTINUE`,
    //         description: `L:CONTINUE`,

    //     });

    //     helper.learningPathCreator
    //         .togglePublishing()
    //         .addConfirmation()
    //         .saveLearningPath()
    //         .checkLPInList('L:CONTINUE')
    // },

    // ' Create L:LOCKED LP': () => {

    //     helper.learningPathCreator.goToCreateLearningPathPage();
    //     helper.learningPathCreator.create({
    //         title: `L:LOCKED`,
    //         description: `L:LOCKED`,

    //     });

    //     helper.learningPathCreator
    //         .togglePublishing()
    //         .addConfirmation()
    //         .saveLearningPath()
    //         .checkLPInList('L:LOCKED')
    //         .toggleLocking('L:LOCKED')
    //         .saveChangesInList()
    // },
};