import { NightWatchBrowser as Browser } from 'nightwatch';
//import { Constants } from '../../infrastructure/constants';
import { Helper } from '../../infrastructure/helpers/helper';
//import { GuidGenerator } from '../../infrastructure/guid-generator';

let helper: Helper;

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


    ' Upload All documents in LP gallery': () => {
        helper.learningPathCreator
            .goToCreateLearningPathPage()
            .openDocumentList()
            //Upload word document from project folder
            helper.learningPathCreator.uploadDocument('TestDocumentForLP.docx')
            helper.browser.pause(10000)
            helper.learningPathCreator.uploadDocument('mp3.mp3')
            helper.browser.pause(10000)
            helper.learningPathCreator.uploadDocument('png.png')
            helper.browser.pause(10000)
            helper.learningPathCreator.uploadDocument('jpg.jpg')
            helper.browser.pause(10000)
            helper.learningPathCreator.uploadDocument('gif.gif')
            helper.browser.pause(10000)
            helper.learningPathCreator.uploadDocument('mp4.mp4')
            helper.browser.pause(10000)
    },

    ' Create Word document in LP gallery': () => {
        helper.learningPathCreator
            //.goToCreateLearningPathPage()
            //.openDocumentList()
            .initCreateWord()
            .returnToWindow()
        helper.browser.pause(2000)

    },

    ' Create Excel document in LP gallery': () => {
        helper.learningPathCreator
            //.goToCreateLearningPathPage()
            //.openDocumentList()
            .initCreateExcel()
            .returnToWindow()
        helper.browser.pause(2000)
    },

    ' Create Power Point document in LP gallery': () => {
        helper.learningPathCreator
            //.goToCreateLearningPathPage()
            //.openDocumentList()
            .initCreatePowerPoint()
            .returnToWindow()
        helper.browser.pause(2000)
    },
};