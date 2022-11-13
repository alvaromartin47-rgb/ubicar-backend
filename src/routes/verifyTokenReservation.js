import Token from "../controllers/entities/Token";

const verifyTokenReservation = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    
    try {
        const { userId, reservationId } = Token.verify(
            token,
            process.env.PRIVATE_PWD_RESERVATION
        );

        req.userId = userId;
        req.reservationId = reservationId;

        next();
    } catch (err) {
        res.json({ message: "Token expired or invalid"})
    }
};

export default verifyTokenReservation;