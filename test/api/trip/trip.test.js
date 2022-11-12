// jest.mock('../../../src/routes/verifyToken', () => {
//     return jest.fn((req, res, next) => {
//         next();
//     });
// });

import UserSchema from '../../../src/services/db/models/UserSchema';

jest.spyOn(UserSchema.prototype, 'save')
.mockImplementationOnce(() => Promise.resolve({id: 1234}));

import User from "../../entities/User";
import Trip from "../../entities/Trip";
import app from '../../../src/server';
import { bodyTrip } from './assets';

jest.setTimeout(500000);

describe("PUT /api/trip/reserve/:id", () => {
    let driver;
    let traveler;
    let trip;
    
    beforeAll(async () => {
        const userDriver = await User.create(
            app,
            "alvaro.martin1307@gmail.com"
        );

        const userTraveler = await User.create(
            app,
            "alvaro.martin@live.com.ar"
        );

        driver = userDriver;
        traveler = userTraveler;
        
        trip = await Trip.create(app, 1, bodyTrip, driver.getToken());
    });

    it("User reserve trip and driver is notified", async () => {
        const { status } = await trip.reserve(traveler.getToken());
        const profile = await driver.getProfile();

        expect(status).toBe("Pending");
        expect(profile.notifications.quantity).toBe(1);
        // expect(profile.notifications.notifications[0].message).toBe();
    });
})


// describe("POST /api/trips/search/", () => {
//     let accessToken;
//     let baseURL;

//     beforeAll(async () => {
//         baseURL = "http://ubicar_api_dev:4000";

//         const user = await User.create(
//             app,
//             "alvaro@gmail.com"
//         );
        
//         accessToken = user.getToken();
//     });

    // it("Search trip filter with passengers", async () => {
    //     jest.spyOn(TripSchema, 'find')
    //     .mockImplementationOnce((body) => new Promise((resolve, reject) => {
    //         if (!body?.passengers) resolve([]);
    //         resolve([bodyTrip]);
    //     }));

    //      El problema a resolver es que necesitamos mockear sort y limit.

    //     const trip = new Trip(app);
    //     const filtred = await trip.getTrips({ passengers: 2 });

    //     expect([bodyTrip]).toStrictEqual(filtred);
    // });

// });