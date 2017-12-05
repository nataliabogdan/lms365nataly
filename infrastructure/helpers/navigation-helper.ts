import { HelperBase } from './helper-base';
import { Constants } from '../constants';

export class NavigationHelper extends HelperBase {

    public goToCourseCatalog(): NavigationHelper {//open course catalog admin panel
        this.browser
            .useCss()
            .url(Constants.Urls.Site + Constants.Urls.GoToApp(Constants.AppInstances.CourseCatalog))
            .waitForElementPresent('div#courses-list-grid', Constants.Timeouts.Large);
        return this;
    }

    public goToAssignments(): NavigationHelper {
        this.browser
            .url(Constants.Urls.Site + Constants.Urls.GoToApp(Constants.AppInstances.Assignments))
            .waitForElementVisible('table#assignmentsList', Constants.Timeouts.Large);
        return this;
    }

    public goToQuizStorage(): NavigationHelper {
        this.browser
            .waitForElementVisible('//div[a[contains(@href, "/Quiz/Storage?")]]', Constants.Timeouts.Large)
            .click('//div[a[contains(@href, "/Quiz/Storage?")]]', () => {
                console.log('Quiz Storage link is clicked')
            })
            .useCss()
            .waitForElementVisible('#grid', Constants.Timeouts.Large);
        return this;
    }

    public goToScorm(): NavigationHelper {
        this.browser
            .url(Constants.Urls.Site + Constants.Urls.GoToApp(Constants.AppInstances.Scorm))
            .waitForElementVisible('div#grid', Constants.Timeouts.Huge)

        return this;
    }

    public goToLearningPath(): NavigationHelper {
        this.browser
            .url(Constants.Urls.Site + Constants.Urls.GoToApp(Constants.AppInstances.LearningPath))
        //.waitForElementPresent('div#learningPathGrid', Constants.Timeouts.Large)

        return this;
    }

    public goToTrainingPlanList(): NavigationHelper {
        // this.browser.useXpath()           //open course catalog admin panel
        this.browser
        .useXpath()
        .waitForElementVisible('//div[a[contains(@href, "/Catalog/TrainingPlans?")]]', Constants.Timeouts.Large)
        .click('//div[a[contains(@href, "/Catalog/TrainingPlans?")]]', () => {
            console.log('Training Plan link  from the left navigation menu is clicked')
        })
        .useCss()
        .waitForElementPresent('div#courses-list-grid', Constants.Timeouts.Large);
        return this;
    }

    public addAnApp(): NavigationHelper {//opens 'Your Apps' page on the site (like pressing 'Add an App ' manually)
        this.browser
            .url(Constants.Urls.YourAppsUrl)
        return this;

    }

    public siteContent(): NavigationHelper {//opens site content page on the site
        this.browser
            .url(Constants.Urls.SiteContent)

            .waitForElementPresent('div#courses-list-grid', Constants.Timeouts.Large)

        return this;
    }

    // public goToCoursehomePage(updElearningTitle): NavigationHelper {
    //     this.browser
    //         .url(Constants.Urls.Site + updElearningTitle)
    //     return this;
    // }

    public goToMlwp(): NavigationHelper {//opens page with MLWP
        this.browser
            .url(Constants.Urls.MlwpPage)
            .waitForElementPresent('div.ef-my-learning-modules', Constants.Timeouts.Large)
        return this;
    }

    public goToDashboard(): NavigationHelper {//opens page with MLWP
        this.browser
            .url(Constants.Urls.DashboardPage)
            .useCss()
            .waitForElementPresent('#lms365 div.k-grid.k-widget table', Constants.Timeouts.Large)
            .moveToElement('#lms365 div.k-grid.k-widget table', 50, 50)
        return this;
    }

    public goToDashboardEditColumns(): NavigationHelper {//opens page with MLWP
        this.browser
            .url(Constants.Urls.DashboardPageEditColumns)
        return this;
    }


}