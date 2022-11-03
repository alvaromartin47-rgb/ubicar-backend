import mercadopago from 'mercadopago';
import request from 'supertest';
const baseURL = "http://ubicar_api_dev:4000";

import * as A from './assets';

describe("POST /api/payment/reserve/", () => {
    it("Test", async () => {
        // Create user and tokens

        const user1 = await request(baseURL)
        .post("/api/user/fake")
        .send(A.bodyUser1);

        const user2 = await request(baseURL)
        .post("/api/user/fake")
        .send(A.bodyUser2);
        
        const accessToken1 = user1.body.accessToken;
        const accessToken2 = user2.body.accessToken;

        // User1 publish trip

        const tripId = 1
        const resPublishTrip = await request(baseURL)
        .put(`/api/trip/${tripId}`)
        .send(A.bodyTrip)
        .set("authorization", `Bearer ${accessToken1}`);

        // Get card token from Mercado Pago API

        const params = new URLSearchParams(A.paramsToGetCardToken)
        .toString();
        const endpoint = "/v1/card_tokens";
        const url = "https://api.mercadopago.com";

        const resCardTokenMP = await request(`${url}`)
        .post(`${endpoint}?${params}`)
        .send(A.formInfoCard);

        // Reserve payment in Mercado Pago

        const reservePaymentBody = {
            token: resCardTokenMP.body.id,
            issuer_id: "3",
            payment_method_id: "master",
            transaction_amount: 100,
            installments: 1,
            payer: {
                email: "test_user_14941830@testuser.com",
                identification: resCardTokenMP.body.cardholder.identification
            }
        }

        const resNewReserveMP = await request(baseURL)
        .post(`/api/payment/reserve/${tripId}`)
        .send(reservePaymentBody)
        .set('authorization', `Bearer ${accessToken2}`)
        
        expect(resNewReserveMP.statusCode).toBe(200);
    });
});