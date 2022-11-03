import UserSchema from "../../../services/db/models/UserSchema";

async function updateProfile(req, res) {
    const updated = await UserSchema
    .findByIdAndUpdate(req.userId, req.body);

    if (!updated) {
        res.status(404).send("User not found");
    }
    
    res.status(201).end();
}

export default updateProfile;