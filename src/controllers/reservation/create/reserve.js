import Reserve from '../../entities/Reserve';

async function reserve(req, res) {
    const travelerId = req.userId;
    const tripId = req.params.tripId;
    const paymentData = req.body;
    
    try {
        const reservation = await Reserve.create(
            tripId,
            travelerId,
            paymentData
        );

        return res.json({status: reservation.getStatus()})
    } catch(err) {
        const resJson = {message: err.message}
        return res.json(resJson);
    }
}

export default reserve;