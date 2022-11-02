import Token from '../../entities/Token';
import UserSchema from '../../../services/db/models/UserSchema';

async function createFakeUser(req, res) {
    const newUser = new UserSchema(req.body);
    const { _id } = await newUser.save();

    const accessToken = Token.generate(
        {userId: _id},
        "10m",
        process.env.PRIVATE_PWD_TEST
    );

    res.json({accessToken});
}

export default createFakeUser;