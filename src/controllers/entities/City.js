import axios from "axios";

export default class City {
    
    constructor(infoCity) {
        this.info = infoCity;
    }

    static async create(cityId) {
        const url = "https://apis.datos.gob.ar/georef/api/localidades";
        const params = `id=${cityId}&campos=centroide,provincia`;
        
        const info = await axios.get(`${url}?${params}`);
        
        const l = info?.data.localidades[0];
        if (!l) throw new Error("City not found");

        return new City({
            id: l.id,
            name: `${l.nombre}, ${l.provincia.nombre}, Argentina`,
            lat: l.centroide.lat,
            lon: l.centroide.lon
        });
    }

    getInfo() {
        return this.info;
    }

    getCoordinates() {
        return `${this.info.lat},${this.info.lon}`;
    }

    async getDistanceAndDurationTo(cityDest) {
        const objParams = {
            apikey: process.env.MY_MAPPI_TOKEN,
            orig: this.getCoordinates(),
            dest: cityDest.getCoordinates()
        }
        
        const url = "https://api.mymappi.com/v2/directions/route/car";
        const params = new URLSearchParams(objParams).toString();
        
        const res = await axios.get(`${url}?${params}`);

        return {
            distance: res.data.data.routes[0].distance / 1000,
            duration: res.data.data.routes[0].duration / 60
        }
    }

}