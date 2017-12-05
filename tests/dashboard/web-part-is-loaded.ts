import { NightWatchBrowser as Browser } from 'nightwatch';
// import { Constants } from '../../infrastructure/constants';
import { Helper } from '../../infrastructure/helpers/helper';

let helper: Helper;
// declare const WORKING_PATH: string;

export = {
    before: (browser: Browser) => {
        browser.maximizeWindow();
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();
    },

    after: (browser: Browser) => {
        browser.end();
    },


    // 'Open every tab and make a screenshot of loaded values/data': () => {
    //     helper.navigation.goToDashboard();
    //     helper.courseCreator.openAllTabsInDashboard();
    // },

    'Open Team View': () => {
        helper.navigation.goToDashboard();
        helper.courseCreator.openTeamViewInDashboard()
    },

    // 'Add all Tabs is Dashboard': () => {
    //     helper.navigation.goToDashboardEditColumns();
    //     helper.courseCreator.editPage();
    //     helper.courseCreator.initEditDashboardWebPart()
    //     helper.courseCreator.enableDashboardTabs()
    //     helper.courseCreator.savePage();
    // },

    // 'Add all columns in Tab': () => {
    //     helper.navigation.goToDashboardEditColumns();
    //     helper.courseCreator.editPage();
    //     helper.courseCreator.initAddColumnDashboardTab();
    //     helper.courseCreator.addDashboardColumns();
    //     helper.courseCreator.savePage();
    // },


    // 'Edit title of added columns in Tab': () => {
    //     helper.navigation.goToDashboardEditColumns();
    //     helper.courseCreator.editPage();
    //     helper.courseCreator.initAddColumnDashboardTab();
    //     helper.courseCreator.editTitleDashboardColumns();
    //     helper.courseCreator.savePage();
    // },

    // 'Delete all columns in Tab': () => {
    //     helper.navigation.goToDashboardEditColumns();
    //     helper.courseCreator.editPage();
    //     helper.courseCreator.initAddColumnDashboardTab();
    //     helper.courseCreator.deleteDashboardColumns();
    //     helper.courseCreator.savePage();
    // },
};
