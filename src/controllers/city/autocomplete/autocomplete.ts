import axios from 'axios';

async function autocomplete(req, res) {
    const q = req.query.q;
    
    const url = "http://apis.datos.gob.ar/georef/api/localidades";
    const params = `nombre=${q}&campos=centroide,provincia`;
    
    const resp = await axios.get(`${url}?${params}`);
    
    const cities = [];

    // if (l.nombre.startsWith(q.toUpperCase())) si 
    // queremos que solo devuelva las que comienzan
    // con ese nombre. O includes() las que contengan.

    for (let l of resp.data.localidades) {
        if (!l.nombre.includes(q.toUpperCase())) continue;

        cities.push({
            id: l.id,
            name: `${l.nombre}, ${l.provincia.nombre}, Argentina`,
            lat: l.centroide.lat,
            lon: l.centroide.lon
        });
    }

    res.json(cities);
}

export default autocomplete;