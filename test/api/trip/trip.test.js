// jest.mock('../../../src/routes/verifyToken', () => {
//     return jest.fn((req, res, next) => {
//         next();
//     });
// });

import UserSchema from '../../../src/services/db/models/UserSchema';
import TripSchema from '../../../src/services/db/models/TripSchema';
jest.spyOn(UserSchema.prototype, 'save')
.mockImplementationOnce(() => Promise.resolve({_id: 1234}));

import request from 'supertest';
import User from "../../entities/User";
import Trip from "../../entities/Trip";
import app from '../../../src/server';
import { bodyTrip } from './assets';

describe("POST /api/trips/search/", () => {
    let accessToken;
    let baseURL;

    beforeAll(async () => {
        baseURL = "http://ubicar_api_dev:4000";

        const user = await User.create(
            app,
            "alvaro@gmail.com"
        );
        
        accessToken = user.getToken();    
    });

    // it("Search trip filter with passengers", async () => {
    //     jest.spyOn(TripSchema, 'find')
    //     .mockImplementationOnce((body) => new Promise((resolve, reject) => {
    //         if (!body?.passengers) resolve([]);
    //         resolve([bodyTrip]);
    //     }));

    //     const trip = new Trip(app);
    //     const filtred = await trip.getTrips({ passengers: 2 });

    //     expect([bodyTrip]).toStrictEqual(filtred);
    // });

});