import TripSchema from '../../../services/db/models/TripSchema';
import Reserve from '../../entities/Reserve';

export default async function reserve(req, res) {
    const tripId = req.params.id;

    const trip = await TripSchema.findOne({ tripId });
    if (!trip) return res.status(404).json({
        message: "Inexistent trip"
    });

    if (trip.driver.id === req.userId) return res.status(400)
    .json({ message: "You can't book your own trip" });

    const reserve = await Reserve.create(trip, req.userId);

    res.status(reserve.status_code).json(reserve);
}