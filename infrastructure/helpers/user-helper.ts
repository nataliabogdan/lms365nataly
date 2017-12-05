import { HelperBase } from './helper-base';
import { UserInfo, UserRole } from '../models';
import { Constants } from '../constants';

export class UserHelper extends HelperBase {
    private _user: UserInfo;

    private loginAsUser(role: UserRole): UserHelper {
        console.log('loginAsUser');

        if (this._user && this._user.role == role) {
            console.log(`loginAsUser: current user's is already logged in as ${role}`);
            return this;
        }
        if (!this._user) {
            switch (role) {
                case UserRole.Learner:
                    this._user = Constants.Users.Learner;
                    break;
                case UserRole.Teacher:
                    this._user = Constants.Users.Teacher;
                    break;
                case UserRole.LMSAdmin:
                    this._user = Constants.Users.LMSadmin;
                    break;
            }

            this.browser
                .url(Constants.Urls.Site)
                .windowMaximize();
            let that = this;
            this.browser.isVisible('#login_user_chooser', function (result) {
                if (result.value) {
                    that.browser.click('a#use_another_account_link');
                }
            });
            this.browser
                .waitForElementPresent('input[name="login"]', Constants.Timeouts.Medium)
                .setValue('input[name="login"]', this._user.loginName)
                .setValue('input[name="passwd"]', this._user.password)
                .pause(1000)
                .waitForElementVisible('button#cred_sign_in_button:enabled', Constants.Timeouts.Medium)
                .click('button#cred_sign_in_button');
        }
        return this;
    }

    public logout(): UserHelper {
        this.browser
            .url(Constants.Urls.Site)
            .pause(Constants.Timeouts.Medium) //!!!problem with O365 menu overlapping by web parts
            .useCss()
            .waitForElementPresent('#O365_MeFlexPane_ButtonID', Constants.Timeouts.Huge)
            // .waitForElementVisible('#O365_MeFlexPane_ButtonID', Constants.Timeouts.Huge)
            .click('#O365_MeFlexPane_ButtonID', () => {
                console.log('Button ID is clicked')
            })
            .waitForElementPresent('a#O365_SubLink_ShellSignout', Constants.Timeouts.Huge)
            .waitForElementVisible('a#O365_SubLink_ShellSignout', Constants.Timeouts.Huge)
            .click('a#O365_SubLink_ShellSignout')
            .waitForElementPresent('#login_workload_logo_text', Constants.Timeouts.Huge);
        this._user = null;
        return this;
    }

    public loginAsLMSAdmin(): UserHelper {
        return this.loginAsUser(UserRole.LMSAdmin);
    }

    public loginAsLearner(): UserHelper {
        return this.loginAsUser(UserRole.Learner);
    }

    public loginAsTeacher(): UserHelper {
        return this.loginAsUser(UserRole.Teacher);
    }

}