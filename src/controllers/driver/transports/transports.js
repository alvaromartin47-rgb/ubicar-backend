import TransportSchema from "../../../services/db/models/TransportSchema";

async function transports(req, res) {
    res.json(await TransportSchema.find({
        userId: req.userId
    }));
}

export default transports;