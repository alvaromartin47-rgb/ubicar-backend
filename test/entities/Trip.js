import request from 'supertest';

export default class User {

    constructor(app) {
        this.app = app;
    }

    static async create(app, id, body) {
        const response = await request(app)
        .post(`/api/trip/${id}`)
        .send(body);

        return new User(app, response.body);
    }

    async getTrips(body) {
        const response = await request(this.app)
        .post(`/api/trips/search`)
        .send(body);

        return response.body.trips;
    }
}