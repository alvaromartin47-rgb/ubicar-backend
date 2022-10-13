import Token from "../controllers/entities/Token";

const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];

    try {
        const { userId } = Token.verify(
            token,
            process.env.PRIVATE_PWD
        );

        req.userId = userId;

        next();
    } catch ({ message }) {
        return res.status(500).send({message});
    }
};

export default verifyToken;