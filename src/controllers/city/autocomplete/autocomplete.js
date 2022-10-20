import axios from 'axios';

async function autocomplete(req, res) {
    const q = req.query.q;
    console.log(q);

    const resp = await axios.get(
        `https://api.mymappi.com/v2/places/autocomplete?apikey=${process.env.MY_MAPPI_TOKEN}&q=${q}`
    )
    
    const cities = [];

    for (let c of resp.data.data) {
        if (c.layer != "county") continue;

        const data = {};
        data.id = c.autocomplete_id;
        data.name = c.display_name;
        data.short_name = c.display_name;
        data.full_name = c.display_name;
        data.lat = -35.8261347;
        data.lon = -61.9287713;

        cities.push(data);
    }
    
    res.json(cities);
}

export default autocomplete;