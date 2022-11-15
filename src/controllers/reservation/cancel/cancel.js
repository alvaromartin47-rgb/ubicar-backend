import Reserve from '../../entities/Reserve';

async function cancel(req, res) {
    const {access_token} = req.body;

    const {reservationId} = Token.decode(access_token);
    try {
        const reservation = await Reserve.createWithId(reservationId);
        return res.json(await reservation.cancel());
    } catch(err) {
        return res.json({message: err.message});
    }

}

export default cancel;