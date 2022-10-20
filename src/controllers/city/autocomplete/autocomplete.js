import axios from 'axios';

async function autocomplete(req, res) {
    const q = req.query.q;
    
    const url = "https://apis.datos.gob.ar/georef/api/localidades";
    const params = `nombre=${q}&campos=centroide,provincia`;
    
    const resp = await axios.get(`${url}?${params}`);
    
    res.json(resp.data.localidades.map((l, i) => {
        // if (l.nombre.startsWith(q.toUpperCase())) si 
        // queremos que solo devuelva las que comienzan
        // con ese nombre.

        return {
            id: l.id,
            name: `${l.nombre}, ${l.provincia.nombre}, Argentina`,
            lat: l.centroide.lat,
            lon: l.centroide.lon
        }
    }));
}

export default autocomplete;