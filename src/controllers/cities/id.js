import axios from 'axios';
import City from "../entities/City";

async function id(req, res) {
    const cityId = req.params.id;
    const city = await City.create(cityId);
    
    res.json(city.getInfo());
}

export default id;