import axios from 'axios';

async function getCards(req, res) {
    // const resp = await axios.get(
    //     `https://api.mymappi.com/v2/directions/route/car?apikey=${process.env.MY_MAPPI_TOKEN}&orig=-35.8096888,-61.9010052&dest=bragado`
    // );
    
    const resp = await axios.get(
        `https://api.mymappi.com/v2/places/autocomplete?apikey=${process.env.MY_MAPPI_TOKEN}&q="9 de"`
    )
    
    for (let c of resp.data.data) {
        if (c.layer == "county") console.log(c.display_name);
    }
    
    res.json(resp.data);
}

export default getCards;