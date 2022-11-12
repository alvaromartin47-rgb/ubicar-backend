import request from 'supertest';

export default class Trip {

    constructor(app, body) {
        this.app = app;
        this.id = body.tripId;
    }

    static async create(app, id, body, accessToken) {
        const response = await request(app)
        .post(`/api/trip/${id}`)
        .send(body)
        .set("authorization", `Basic ${accessToken}`);

        return new User(app, response.body);
    }

    getId() {
        return this.id;
    }

    async getTrips(body) {
        const response = await request(this.app)
        .post(`/api/trips/search`)
        .send(body);

        return response.body.trips;
    }

    async reserve(accessTokenTraveler) {
        const response = await request(this.app)
        .put(`/api/trip/${this.id}`)
        .set("authorization", `Basic ${accessTokenTraveler}`);

        return response.body;
    }
}