import { NightWatchBrowser as Browser } from 'nightwatch';
import { Helper } from './helpers/helper';
import { Constants } from './constants';


export class CourseDeletion {
    private readonly _browser: Browser;
    private readonly _helper: Helper;
    public constructor(browser: Browser) {
        this._browser = browser;
        this._helper = new Helper(browser)
    }

    public DeleteCourse(updElearningTitle: string): CourseDeletion {
        this._browser
            .useXpath()
            .waitForElementVisible('//i[contains(@data-icon-name, "Trash")]', Constants.Timeouts.Huge,true)
            .click('//i[contains(@data-icon-name, "Trash")]', () => {
                console.log('Delete action is exerted' + updElearningTitle)
            })
            .useCss()
            .waitForElementVisible('iframe.k-content-frame', Constants.Timeouts.Huge, true)
        this._helper.goToiFrame('iframe.k-content-frame', (frame) => {
            this._helper.browser
                .useCss()
                .waitForElementVisible('input#ok-button', Constants.Timeouts.Huge, true)
                .click('input#ok-button', () => {
                    console.log('Delete action in iframe is exerted')
                });
        });

        this._helper.browser
            .useCss()
            .waitForElementVisible('div#courses-list-grid', Constants.Timeouts.Huge, true)
        return this;
    }


}
