import { NightWatchBrowser as Browser } from 'nightwatch';
import { Constants } from '../../../infrastructure/constants';
import { Helper } from '../../../infrastructure/helpers/helper';
import { GuidGenerator } from '../../../infrastructure/guid-generator';

let helper: Helper;
let key = GuidGenerator.instance.generate();
let coursetitle;

export = {
    before: (browser: Browser) => {
        coursetitle = `Webinar-Course-test_${key}`;
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();
    },

    beforeEach: (browser: Browser) => {
        helper.navigation.goToCourseCatalog();
    },

    'Delete Webinar Course.': () => {
        
                helper.courseDeletion.DeleteCourse(coursetitle)
                helper.browser.waitForElementVisible('div#courses-list-grid', Constants.Timeouts.Large);    
        
            }
        }