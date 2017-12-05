// import { NightWatchBrowser as Browser } from 'nightwatch';
import { Constants } from '../../infrastructure/constants';
// import { CourseInfo } from './models';
import { TrainingPlanInfo } from '../../infrastructure/models';
// import { Helper } from '../../infrastructure/helper';
import {TrainingPlanBase} from './trainingplan-base';



export class TrainingPlanCreator extends TrainingPlanBase {
    


    public create(TrainingPlanInfo: TrainingPlanInfo): TrainingPlanCreator {
        if (TrainingPlanInfo.title) {
            this._browser.setValue('input#CourseName', TrainingPlanInfo.title);
        }

        if (TrainingPlanInfo.description) {
            this._browser.setValue('input#Description', TrainingPlanInfo.description);
        }

        if (TrainingPlanInfo.category) {
            this._browser.setValue('#token-input-Categories_SelectedItems', TrainingPlanInfo.category)
                .waitForElementPresent('li.token-input-dropdown-item-sharepoint, li.token-input-dropdown-item2-sharepoint', Constants.Timeouts.Small)
                .keys([this._browser.Keys.ENTER]);
        }

        if (TrainingPlanInfo.url) {
            this._browser.setValue('input#SiteUrl_RelativeUrl', TrainingPlanInfo.url);
        }
        this._browser.useXpath()
        this.selectTrainingPlanCourses(TrainingPlanInfo.numberCourses);
        this._browser
            .useCss()
            .click('a.--saveCourse');

        return this;
    }


    }





