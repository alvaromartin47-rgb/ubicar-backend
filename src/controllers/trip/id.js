import TripSchema from "../../services/db/models/TripSchema";

async function id(req, res) {
    req.body.tripId = req.params.id;

    const { routeNodes } = req.body;
    const len = routeNodes.length;
    if (len < 2) res.status(400).send("Error");

    req.body.fromCityId = req.body.routeNodes[0].cityId;
    req.body.toCityId = req.body.routeNodes[len - 1].cityId;
    req.body.date = new Date(req.body.datetime);

    const newTrip = new TripSchema(req.body);
    await newTrip.save();

    res.status(201).end()
}

export default id;