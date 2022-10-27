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

    getNodes(cityDest, wps, infoRoute) {
        const nodes = [];
        
        nodes.push({
            city: this.getInfo(),
            // datetime: datetime,
            distance: 0,
            duration: 0
        });
        
        for (let i=0; i < infoRoute.legs.length - 1; i++) {
            nodes.push({
                city: wps[i].getInfo(),
                // datetime: datetime,
                distance: infoRoute.legs[i].distance / 1000,
                duration: infoRoute.legs[i].duration / 60
            });
        }

        nodes.push({
            city: cityDest.getInfo(),
            // datetime: datetime,
            duration: infoRoute.legs[infoRoute.legs.length - 1].duration / 60,
            distance: infoRoute.legs[infoRoute.legs.length - 1].distance / 1000
        });

        return nodes;
    }

    async getRouteTo(cityDest, wps) {        
        const objParams = {
            apikey: process.env.MY_MAPPI_TOKEN,
            orig: this.getCoordinates(),
            dest: cityDest.getCoordinates(),
            wps: wps.map((c) => c.getCoordinates()).join(";")
        }
        
        const url = "https://api.mymappi.com/v2/directions/route/car";
        const params = new URLSearchParams(objParams).toString();
        
        const res = await axios.get(`${url}?${params}`);
        const infoRoute = res.data.data.routes[0];

        return { 
            nodes: this.getNodes(cityDest, wps, infoRoute),
            distance: infoRoute.distance / 1000,
            duration: infoRoute.duration / 60,
            // iniDatetime: datetime,
            // endDatetime: datetime
        }
    }

}