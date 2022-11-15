import City from "../entities/City";
import TripSchema from "../../services/db/models/TripSchema";
import UserSchema from "../../services/db/models/UserSchema";

async function id(req, res) {
    req.body.tripId = req.params.id;

    const { routeNodes } = req.body;
    const len = routeNodes.length;
    if (len < 2) res.status(400).send("Error");

    req.body.fromCityId = req.body.routeNodes[0].cityId;
    req.body.toCityId = req.body.routeNodes[len - 1].cityId;
    req.body.date = new Date(req.body.datetime);
    req.body.passengers.avaiable = req.body.passengers.count;

    // set route (Idem Preview, refactorizar)

    const nodes = req.body.routeNodes;
    const ult = nodes.length - 1;
    const nodeOrig = await City.create(nodes[0].cityId);
    const nodeDest = await City.create(nodes[ult].cityId);
    
    const nodesCopy = req.body.routeNodes.slice()
    nodesCopy.shift();
    nodesCopy.pop();
    
    const cityNodes = await Promise.all(
        nodesCopy.map(async (c) => await City.create(c.cityId)
    ));

    req.body.route = await nodeOrig.getRouteTo(nodeDest, cityNodes);
    
    // Get driver (refactorizar)

    const data = await UserSchema.findById(req.userId);
    req.body.driver = {
        id: req.userId,
        displayName: `${data.name} ${data.lastname}`,
        image: data.image,
        travels: data.travels,
        rating: data.rating,
        verification: data.dniVerification
    }

    req.body.passengers.available = req.body.passengers.count;

    const newTrip = new TripSchema(req.body);
    await newTrip.save();

    res.status(201).end()
}

export default id;