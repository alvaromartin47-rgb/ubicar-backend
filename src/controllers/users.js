import UserSchema from '../services/db/models/UserSchema';

async function users(req, res) {
    try {
        const users = await UserSchema.find();
        res.json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}

export default users;