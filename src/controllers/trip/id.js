import TripSchema from "../../services/db/models/TripSchema";

async function id(req, res) {
    req.body.tripId = req.params.id;

    const newTrip = new TripSchema(req.body);
    await newTrip.save();

    res.status(201).end()
}

export default id;