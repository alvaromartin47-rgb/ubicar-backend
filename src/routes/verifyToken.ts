import Token from "../controllers/entities/Token";
import User from "../controllers/entities/User";

const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];

    try {
        const {userId} = Token.verify(
            token,
            process.env.PRIVATE_PWD
        );

        req.userId = userId;
        await User.create(userId);

        next();
    } catch ({ message }) {
        if (message === "User not found") return res.json({message});
        res.redirect(`${process.env.BACKEND_URI}/api/auth/google/signin`);
    }
};

export default verifyToken;