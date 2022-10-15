import Token from "./entities/Token";
import GoogleManager from './entities/GoogleManager';
import GoogleUser from "./entities/GoogleUser";

async function googleAuthSuccess(req, res) {
    const code = req.query.code;

    const googleManager = await GoogleManager.create(code);
    const profileData = await googleManager.getProfile();
    
    profileData.googleCode = code;

    const userId = await GoogleUser.saveInDB(profileData);
    
    const token = Token.generate({userId}, '1h', process.env.PRIVATE_PWD);

    res.redirect(`${process.env.FRONTEND_URI}?token=${token}`);
}

export default googleAuthSuccess;