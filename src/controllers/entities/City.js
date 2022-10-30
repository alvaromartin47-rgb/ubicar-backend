import axios from "axios";
import Route from "./Route";

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

    async getRouteTo(cityDest, wps) {
        const route = await Route.create(this, cityDest, wps);
        
        return route.getPreview();
    }

}