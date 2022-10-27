import City from "../../../entities/City";

async function preview(req, res) {
    const { datetime, nodes } = req.body;

    if(nodes.length < 2) res.json({
        error: "Se necesita origen y destino"
    });

    const ult = nodes.length - 1;
    const nodeOrig = await City.create(nodes[0].cityId);
    const nodeDest = await City.create(nodes[ult].cityId);
    
    const nodesCopy = nodes.slice()
    nodesCopy.shift();
    nodesCopy.pop();
    
    const cityNodes = await Promise.all(
        nodesCopy.map(async (c) => await City.create(c.cityId)
    ));

    res.json(await nodeOrig.getRouteTo(nodeDest, cityNodes));
}

export default preview;