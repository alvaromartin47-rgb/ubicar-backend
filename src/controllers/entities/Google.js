import {OAuth2Client} from 'google-auth-library';

export default class Google {
    
    static generateOAuthClient() {
        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        );

        return oAuth2Client;
    }

    static getUrlLogin() {
        const oAuth2Client = Google.generateOAuthClient();

        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
        });

        return authorizeUrl;
    }

}