import {OAuth2Client} from 'google-auth-library';

function generateOAuth2Client() {
    return new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );
}

export default class GoogleManager {
    
    constructor(oAuth2Client) {
        this.oAuth2Client = oAuth2Client;
    }

    static async create(code=null) {
        const oAuth2Client = generateOAuth2Client();

        if (!code) return;
        
        const res = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(res.tokens);

        return new GoogleManager(oAuth2Client);
    }

    static getUrlLogin(scope) {
        const oAuth2Client = generateOAuth2Client();

        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope,
        });

        return authorizeUrl;
    }

    async getProfile() {
        const params = "personFields=names,photos,emailAddresses";
        const url = `https://people.googleapis.com/v1/people/me?${params}`;
        const res = await this.oAuth2Client.request({ url });
        
        return {
            name: res.data.names[0].givenName,
            lastname: res.data.names[0].familyName,
            image: res.data.photos[0].url,
            email: res.data.emailAddresses[0].value
        }
    }

}