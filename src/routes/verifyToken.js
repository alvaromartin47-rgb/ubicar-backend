import Token from "../controllers/entities/Token";

const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];

    try {
        const { userId } = Token.verify(
            token,
            process.env.PRIVATE_PWD
        );

        req.userId = userId;

        next();
    } catch ({ message }) {
        res.redirect(`${process.env.BACKEND_URI}/api/auth/google/signin`);
    }
};

export default verifyToken;