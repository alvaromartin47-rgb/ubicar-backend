import axios from 'axios';

export default class Route {

    constructor(orig, dest, wps, infoRoute) {
        this.orig = orig;
        this.dest = dest;
        this.wps = wps;
        this.info = infoRoute;
    }

    static async create(orig, dest, wps) {
        const objParams = {
            apikey: process.env.MY_MAPPI_TOKEN,
            orig: orig.getCoordinates(),
            dest: dest.getCoordinates(),
            wps: wps.map((c) => c.getCoordinates()).join(";")
        }
        
        const url = "https://api.mymappi.com/v2/directions/route/car";
        const params = new URLSearchParams(objParams).toString();
        
        const res = await axios.get(`${url}?${params}`);
        
        return new Route(orig, dest, wps, res.data);
    }

    getPreview() {
        const nodes = [];
        const trip = this.info.data.routes[0].legs;
        
        nodes.push({
            city: this.orig.getInfo(),
            // datetime: datetime,
            distance: 0,
            duration: 0
        });
        
        for (let i=0; i < trip.length - 1; i++) {
            nodes.push({
                city: this.wps[i].getInfo(),
                // datetime: datetime,
                distance: trip[i].distance / 1000,
                duration: trip[i].duration / 60
            });
        }

        nodes.push({
            city: this.dest.getInfo(),
            // datetime: datetime,
            duration: trip[trip.length - 1].duration / 60,
            distance: trip[trip.length - 1].distance / 1000
        });

        return { 
            nodes,
            distance: this.info.data.routes[0].distance / 1000,
            duration: this.info.data.routes[0].duration / 60,
            // iniDatetime: datetime,
            // endDatetime: datetime
        }
    }

}