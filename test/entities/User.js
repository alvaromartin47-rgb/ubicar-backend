import request from 'supertest';

export default class User {

    constructor(app, body) {
        this.app = app;
        this.email = body.email;
        this.accessToken = body.accessToken;
    }

    static async create(app, email) {
        const response = await request(app)
        .post("/api/user/fake")
        .send({ email });
        
        return new User(app, response.body);
    }

    getToken() {
        return this.accessToken;
    }

}