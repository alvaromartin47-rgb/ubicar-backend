import Google from './entities/Google';

async function googleAuth(req, res) {
    const url = Google.getUrlLogin();

    res.redirect(url);
}

export default googleAuth;