import UserSchema from "../services/db/models/UserSchema";

async function userProfile(req, res) {
    res.json(await UserSchema.findById(req.userId));
}

export default userProfile;