import TripSchema from '../../../services/db/models/TripSchema';
import Reserve from '../../entities/Reserve';

export default async function reserve(req, res) {
    const tripId = req.params.id;

    const trip = await TripSchema.findOne({ tripId });

    if (!trip) res.status(404).end();

    return await Reserve.create(trip, req.userId);
}