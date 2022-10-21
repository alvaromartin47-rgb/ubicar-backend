import mongoose from "mongoose";
import TransportSchema from "../../services/db/models/TransportSchema";

async function id(req, res) {
    const transportId = req.params.id;

    // const data = await TransportSchema.find({
    //     userId: req.userId,
    //     patent: req.body.patent
    // });

    // if (!data) res.status(400).send(
    //     "El transporte ya existe en el sistema"
    // );

    req.body.userId = req.userId;
    req.transportId = transportId;
    
    const newTransport = new TransportSchema(req.body);
    await newTransport.save();
    
    res.json({message: "ok"});
}

export default id;