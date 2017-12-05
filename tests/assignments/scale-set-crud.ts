import { NightWatchBrowser as Browser } from 'nightwatch';
import { Constants } from '../../infrastructure/constants';
import { Helper } from '../../infrastructure/helpers/helper';
//import { GuidGenerator } from '../../infrastructure/guid-generator';


//NOT FINISHED YET

let helper: Helper;

export = {
    before: (browser: Browser) => {
        helper = new Helper(browser);
        helper.user.loginAsLMSAdmin();
    },

    beforeEach: (browser: Browser) => {
        helper.navigation.goToAssignments();
    },
 
// should be included into tests with course

 'Create new Scale Set': () => {
       // let key = GuidGenerator.instance.generate();

       helper.browser
            .click('a#createScaleset')
            .waitForElementPresent('input.scaleset-required-input', Constants.Timeouts.Small)
            .setValue(".//*[@id='s4-bodyContainer']/div/div[4]/div[2]/div[1]/div/table/tbody/tr[1]/td/h4/input", 'Simple Scale Set')         
            .click('a.add-scale.ms-heroCommandLink')  
            .setValue(".//*[@id='s4-bodyContainer']/div/div[4]/div[2]/div[1]/div/table/tbody/tr[2]/td/table/tbody/tr[1]/td[1]/input", '50')
            .setValue(".//*[@id='s4-bodyContainer']/div/div[4]/div[2]/div[1]/div/table/tbody/tr[2]/td/table/tbody/tr[1]/td[5]/input", 'First')
            .setValue(".//*[@id='s4-bodyContainer']/div/div[4]/div[2]/div[1]/div/table/tbody/tr[2]/td/table/tbody/tr[2]/td[1]/input", '0') 
            .setValue(".//*[@id='s4-bodyContainer']/div/div[4]/div[2]/div[1]/div/table/tbody/tr[2]/td/table/tbody/tr[2]/td[5]/input", 'Second')
            .click('a.save-scaleset ms-heroCommandLink')
    }
}