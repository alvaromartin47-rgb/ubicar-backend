import Reserve from '../../entities/Reservation/Reserve';
import Token from '../../entities/Token';

async function accept(req, res) {
    const {access_token} = req.body;

    const {reservationId} = Token.decode(access_token);
    try {
        const reservation = await Reserve.createWithId(reservationId);
        return res.json(await reservation.accept());
    } catch(err) {
        return res.json({message: err.message});
    }
}

export default accept;