import Google from './entities/Google';

async function googleAuthSuccess(req, res) {
    const code = req.query.code;

    const oAuth2Client = Google.generateOAuthClient();
    
    const token = await oAuth2Client.getToken(code);
    const access_token = token.tokens.access_token;
    oAuth2Client.setCredentials(token.tokens);
    
    // const url = 'https://people.googleapis.com/v1/people/me?personFields=names';
    // const resp = await oAuth2Client.request({url});
    
    // Generar JWT

    res.redirect(
        `http://localhost:3000?access_token=${access_token}`
    );
}

export default googleAuthSuccess;