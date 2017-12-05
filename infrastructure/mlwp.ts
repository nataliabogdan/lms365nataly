import { NightWatchBrowser as Browser } from 'nightwatch';
import { Constants } from './constants';
// import { Helper } from './helpers/helper';

declare const WORKING_PATH: string;

export class MlwpHelper {
    private readonly _browser: Browser;
    // private readonly _helper: Helper;

    public constructor(browser: Browser) {
        this._browser = browser;
        // this._helper = new Helper(browser);
    }


    public startAttempt(item: string): MlwpHelper {
        this._browser
        .useXpath()
        .waitForElementPresent(`//div[h3[contains(text(),"${item}")]]`, Constants.Timeouts.Large)
        .click(`//div[h3[contains(text(),"${item}")]]//a[@class="ms-link"]`)
        .waitForElementPresent('//div[contains(@id, "s4-bodyContainer")]', Constants.Timeouts.Large)
        .saveScreenshot(`${WORKING_PATH}/files/Screenshots/MLWP/${item}.png`)
        return this;
    }

}