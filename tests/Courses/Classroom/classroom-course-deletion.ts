import { NightWatchBrowser as Browser } from 'nightwatch';
// import { Constants } from '../../../infrastructure/constants';
import { Helper } from '../../../infrastructure/helpers/helper';
// import { GuidGenerator } from '../../../infrastructure/guid-generator';

let helper: Helper;
// let key = GuidGenerator.instance.generate();
let coursetitleUpdated;

export = {
    before: (browser: Browser) => {
        coursetitleUpdated = `Classroom-Course-test_Updated`;
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();
    },

    beforeEach: (browser: Browser) => {
        helper.navigation.goToCourseCatalog();
    },

    'Delete Classroom Course.': () => {

        helper.courseDeletion.DeleteCourse(coursetitleUpdated)

        return this;


    }
}