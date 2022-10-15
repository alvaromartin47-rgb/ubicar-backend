import Google from './entities/Google';

async function userProfile(req, res) {
    const sToken = req.headers.authorization;
    const token = sToken.split(' ')[1];

    const oAuthClient = Google.generateOAuthClient();
    oAuthClient.setCredentials(JSON.parse(token));

    const url = "https://people.googleapis.com/v1/people/me?personFields=photos";
    const response = await oAuthClient.request({ url });

    res.json({image: response.data.photos[0].url});
}

export default userProfile;