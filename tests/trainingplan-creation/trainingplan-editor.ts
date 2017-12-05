// import { NightWatchBrowser as Browser } from 'nightwatch';
import { Constants } from '../../infrastructure/constants';
import { TrainingPlanInfo } from '../../infrastructure/models';
import {TrainingPlanBase} from './trainingplan-base';

export class TrainingPlanEditor extends TrainingPlanBase {


    public edit(TrainingPlanInfo: TrainingPlanInfo): TrainingPlanEditor {
        if (TrainingPlanInfo.title) {
            this._browser
                .useCss()
                .clearValue('input#CourseName')
                .setValue('input#CourseName', TrainingPlanInfo.title, () =>{
                    console.log("Training Plan title is updated")
                });
        }

        if (TrainingPlanInfo.description) {
            this._browser
                .useCss().setValue('input#Description', TrainingPlanInfo.description, () => {
                    console.log("Training Plan description is updated")
                });
        }

        if (TrainingPlanInfo.category) {
            this._browser
                .useCss()
                .setValue('#token-input-Categories_SelectedItems', TrainingPlanInfo.category, () => {
                    console.log("Training Plan category is updated")
                })
                .waitForElementPresent('li.token-input-dropdown-item-sharepoint, li.token-input-dropdown-item2-sharepoint', Constants.Timeouts.Small)
                .keys([this._browser.Keys.ENTER]);
        }

        if (TrainingPlanInfo.url) {
            this._browser
                .useCss().setValue('input#SiteUrl_RelativeUrl', TrainingPlanInfo.url, () => {
                    console.log("Training Plan URL is filled")
                });
        }

        this._browser.useXpath()
        this.selectTrainingPlanCourses(TrainingPlanInfo.numberCourses);
        this._browser
            .useCss().click('a.--saveCourse'), () => {
                console.log("Training Plan Create link is pressed")
            };

        return this;
    }

}


