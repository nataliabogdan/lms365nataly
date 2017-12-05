import { NightWatchBrowser as Browser } from 'nightwatch';
import { Constants } from '../../infrastructure/constants';
import { Helper } from '../../infrastructure/helpers/helper';
import { GuidGenerator } from '../../infrastructure/guid-generator';
import { Uploads, UploadType } from '../../infrastructure/models';

let helper: Helper;
let key = GuidGenerator.instance.generate();
let assignment_name: string = 'assaignName_';
//var tomorrow = new Date();
//tomorrow.setDate(new Date().getDate()+1);

declare const WORKING_PATH: string; // repository path

export = {
    before: (browser: Browser) => {
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();
        helper.navigation.goToAssignments();
    },
    after: (browser: Browser) => {
        browser.end();
    },

    'Create assignment with file attached and uploads into description': () => {
        helper.assignmentCreator
            .goToCreationPage()
            .create({
                title: `${assignment_name + key}`,
                description: assignment_name,
                tag: assignment_name,
                open_date: new Date(),
                due_date: new Date(),
                upload_file: `${WORKING_PATH}/files/Doc1.docx`,
                uploads_to_description: [
                    {
                        uploadType: UploadType.YouTube,
                        file_path: 'https://youtu.be/iUdeS4RVhYQ',
                    } as Uploads,
                    {
                        uploadType: UploadType.video,
                        file_path: `${WORKING_PATH}/files/video-small.mov`,
                    } as Uploads,
                    {
                        uploadType: UploadType.image,
                        file_path: `${WORKING_PATH}/files/image.png`,
                    } as Uploads,
                    {
                        uploadType: UploadType.file,
                        file_path: `${WORKING_PATH}/files/file.pdf`,
                    } as Uploads,
                ]
            });
        helper.browser.waitForElementPresent('table#assignmentsList', Constants.Timeouts.Large);
    },

    'Check required fields in assignment creation': () => {
        helper.assignmentCreator
            .goToCreationPage()
            .create({
                title: '',
                open_date: null,
                due_date: null,
            });
        helper.browser
            .waitForElementVisible('span#Title_validationMessage', Constants.Timeouts.Medium)
            .waitForElementVisible('span#editor_validationMessage', Constants.Timeouts.Medium)
            .waitForElementVisible('span#OpenDate_validationMessage', Constants.Timeouts.Medium)
            .waitForElementVisible('span#DueDate_validationMessage', Constants.Timeouts.Medium)
            .click('a.f-btn.cancel-link.ms-heroCommandLink'); //cancel creation
    },

    'Change title and description, upload document in assignment editing': () => {
        helper.assignmentCreator
            .goToEditingPage(assignment_name)
            .create({
                title: assignment_name,
                description: assignment_name,
                tag: assignment_name,
                open_date: new Date(),
                due_date: new Date(),
            });
        helper.browser.waitForElementPresent('table#assignmentsList', Constants.Timeouts.Large);
    },

    'Delete assignment': () => {
        helper.assignmentCreator.deleteAssignment(assignment_name)
        helper.browser.waitForElementPresent('table#assignmentsList', Constants.Timeouts.Large);
    },
}