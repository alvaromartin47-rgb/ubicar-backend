import axios from 'axios';

async function getCards(req, res) {
    const resp = await axios.get(
        `https://api.mymappi.com/v2/directions/route/car?apikey=${process.env.MY_MAPPI_TOKEN}&orig=${req.query.orig}&dest=${req.query.dest}`
    );
    
    res.json({distance: `${resp.data.data.routes[0].distance / 1000}km`});
}

export default getCards;