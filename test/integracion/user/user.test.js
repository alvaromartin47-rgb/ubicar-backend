// import request from 'supertest';
// const baseURL = "http://ubicar_api_dev:4000";

// import * as A from './assets';

// describe("PUT /api/user/profile/", () => {
//     it("Update user profile (the user exists)", async () => {
//         // Create user and token

//         const user = await request(baseURL)
//         .post("/api/user/fake")
//         .send(A.bodyUser);
        
//         const accessToken = user.body.accessToken;

//         // Update user profile

//         const resUpdateUserProfile = await request(baseURL)
//         .put(`/api/user/profile`)
//         .send(A.bodyUpdateUserProfile)
//         .set('authorization', `Bearer ${accessToken}`)

//         expect(resUpdateUserProfile.statusCode).toBe(201);
//     });

// });