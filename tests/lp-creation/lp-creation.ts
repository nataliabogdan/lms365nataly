import { NightWatchBrowser as Browser } from 'nightwatch';
import { Helper } from '../../infrastructure/helpers/helper';
import { GuidGenerator } from '../../infrastructure/guid-generator';
import { LearningItemType } from '../../infrastructure/models';

let helper: Helper;
let lptitle;
//declare const WORKING_PATH:string;
//need to upload and add on site scorm and quiz before running test (scorm title: scorm for LP, quiz title: quiz for LP) and RUN lp-upload documents test


export = {

    // '@disabled': true,

    before: (browser: Browser) => {
        browser.maximizeWindow();
        lptitle = `!bn learningpath published`;
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();

    },
    
    beforeEach: (browser: Browser) => {
        helper.navigation.goToLearningPath();
    },

         after: (browser: Browser) => {
         browser.end();
     },


    ' Create Published Learning Path on Site Page': () => {
        let key = GuidGenerator.instance.generate();
        helper.learningPathCreator
        .goToCreateLearningPathPage()
        .openDocumentList();
        helper.learningPathCreator.create({
            title: lptitle,
            description: `ui-test_${key}`,
            published: true,
            items:[
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
                    title: 'quiz for LP',
                    type: LearningItemType.Quiz
                },
                {
                    title: 'scorm for LP',
                    type: LearningItemType.Scorm
                },
                {   fileName: 'TestDocumentForLP.docx',
                    type: LearningItemType.File
                },
                {   fileName: 'mp3.mp3',
                type: LearningItemType.File
                },
                {   fileName: 'png.png',
                type: LearningItemType.File
                },
                {   fileName: 'jpg.jpg',
                type: LearningItemType.File
                },
                {   fileName: 'gif.gif',
                type: LearningItemType.File
                },
                {   fileName: 'mp4.mp4',
                type: LearningItemType.File
                },
            ]
        });

        helper.learningPathCreator
            .checkLPInList(lptitle)

    },
};