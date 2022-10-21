import City from "../../../entities/City";

async function preview(req, res) {
    const { datetime, nodes } = req.body;

    if(nodes.length < 2) res.json({
        error: "Se necesita origen y destino"
    });
    
    const origCity = await City.create(nodes[0]);

    const response = {
        nodes: [{
            city: origCity.getInfo(),
            datetime,
            distance: 0
        }],
        distance: 0,
        duration: 0,
        iniDatetime: datetime,
        endDatetime: datetime
    }

    let totalDistance = 0;
    let totalDuration = 0;
    for (let i=0; i < nodes.length; i++) {
        if (i + 1 == nodes.length) break;

        const orig = nodes[i].cityId;
        const dest = nodes[i + 1].cityId;
        const cityOrig = await City.create(orig);
        const cityDest = await City.create(dest);

        const {
            distance,
            duration
        } = await cityOrig.getDistanceAndDurationTo(cityDest);
        
        totalDistance += distance;
        totalDuration += duration;

        response.nodes.push({
            city: cityDest.getInfo(),
            datetime: 0,
            distance,
            duration
        });
    }

    response.distance = totalDistance;
    response.duration = totalDuration;

    res.json(response);
}

export default preview;