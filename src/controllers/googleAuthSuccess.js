import Google from './entities/Google';

async function googleAuthSuccess(req, res) {
    const code = req.query.code;

    const oAuth2Client = Google.generateOAuthClient();
    
    const token = await oAuth2Client.getToken(code);
    
    // Generar JWT

    res.redirect(
        `https://ubicar-web.vercel.app?token=${JSON.stringify(token.tokens)}`
    );
}

export default googleAuthSuccess;