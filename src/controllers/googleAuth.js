import GoogleManager from './entities/GoogleManager';

async function googleAuth(req, res) {
    const scope = [
        'https://www.googleapis.com/auth/userinfo.email',
        "https://www.googleapis.com/auth/userinfo.profile"
    ];
    const url = GoogleManager.getUrlLogin(scope);

    res.redirect(url);
}

export default googleAuth;