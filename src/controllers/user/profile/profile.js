import UserSchema from "../../../services/db/models/UserSchema";

async function profile(req, res) {
    res.json(await UserSchema.findById(req.userId));
}

export default profile;