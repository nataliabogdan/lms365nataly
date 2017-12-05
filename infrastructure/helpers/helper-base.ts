import { NightWatchBrowser as Browser } from 'nightwatch';

export abstract class HelperBase {
    private _browser: Browser;

    public constructor(browser: Browser) {
        this._browser = browser;
    }

    public get browser(): Browser {
        return this._browser;
    }    
}


