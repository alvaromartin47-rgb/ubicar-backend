import TripSchema from "../../../services/db/models/Trip";

function getRelativeEpoch(epochUTC, diference) {
    let epochUTCCopy = epochUTC;
    epochUTCCopy = epochUTCCopy - (3600 * 1000 * diference);
    
    return epochUTCCopy;
}

function getEpochRange(date, difEpochZone) {
    const parse = date.split("-");
    const month = parse[1].split()[0] === 0 ?
    parse[1].split()[1]: parse[1];

    let epochInf = Date.UTC(parse[0], month - 1, parse[2]);
    epochInf = getRelativeEpoch(epochInf, difEpochZone);
    
    const epochSup = epochInf + (86400 * 1000);

    return { epochInf, epochSup };
}

export default async function search(req, res) {    
    const filtredEntryBody = Object.entries(req.body)
    .filter(([key, value]) => !!value);
    const filtredBody = Object.fromEntries(filtredEntryBody); 

    // Filter per timezone

    const difEpochZone = -3;
    const { datetime } = filtredBody;
    if (datetime) {
        const { epochInf, epochSup } = getEpochRange(
            datetime,
            difEpochZone
        );

        filtredBody.datetime = { $gte: epochInf, $lte: epochSup };
    }
    
    // Generate filter orderBy

    const { orderBy, orderAsc } = filtredBody;
    let objSort = {};
    if (orderAsc && orderBy) objSort[orderBy] = 1;
    else if (orderBy) objSort[orderBy] = -1;

    const { passengers } = filtredBody;
    if (passengers) filtredBody.passengers = { count: passengers }
    
    const data = await TripSchema.find(filtredBody)
    .sort(objSort)
    .limit(filtredBody.limit || 15);

    const trips = data.slice(filtredBody.skip || 0);

    res.json({
        trips,
        skip: filtredBody.skip || 0,
        limit: filtredBody.limit || 15,
        total: trips.length 
    });
}
