import { NightWatchBrowser as Browser } from 'nightwatch';
// import { Constants } from '../../../infrastructure/constants';
import { Helper } from '../../../infrastructure/helpers/helper';
import { GuidGenerator } from '../../../infrastructure/guid-generator';

let helper: Helper;
let eLearningNewLayout: string;
let courseKey: string;


export = {
    before: (browser: Browser) => {
        courseKey = GuidGenerator.instance.generate();
        eLearningNewLayout = `EL_NL_${courseKey}`
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();
    },
    beforeEach: (browser: Browser) => {
    },

    after: (browser: Browser) => {
        browser.end();
    },

    'Create eLearning': () => {
        console.log('Elearning creation' + eLearningNewLayout);  //works
        helper.navigation.goToCourseCatalog();
        helper.courseCreator
            .goToCreationPageElearning()
            .create({
                category: 'cat',
                description: 'Some description',
                title: eLearningNewLayout,
                url: eLearningNewLayout,
                // selectContentPackage: scormLM,
                // selectQuizz: quizLM
            });
    }
}
