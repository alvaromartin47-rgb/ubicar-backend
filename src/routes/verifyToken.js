import Token from "../controllers/entities/Token";

const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];

    try {
        const { userId } = Token.verify(
            token,
            process.env.PRIVATE_PWD
        );

        if (req.body.reservation_token) {
            try {
                const { reservationId } = Token.verify(
                    token,
                    process.env.PRIVATE_PWD_RESERVATION
                );
                req.reservationId = reservationId;
            } catch(err) {
                res.json({
                    message: "Reservation token expired or invalid"
                });
            }
        }

        req.userId = userId;

        next();
    } catch ({ message }) {
        res.redirect(`${process.env.BACKEND_URI}/api/auth/google/signin`);
    }
};

export default verifyToken;