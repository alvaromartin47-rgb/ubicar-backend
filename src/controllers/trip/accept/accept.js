import Reserve from '../../entities/Reserve';

async function accept(req, res) {
    const reservationId = req.params.reservationId;

    try {
        const iReserve = await Reserve.instanceWith(reservationId);
        return res.json(await iReserve.accept());
    } catch(err) {
        const resJson = { message: err.message, status_code: 400 }
        return res.status(resJson.status_code).json(resJson);
    }
}

export default accept;