import request from 'supertest';
const baseURL = "http://ubicar_api_dev:4000";

describe("POST /api/payment/reserve/", () => {
    it("Test", async () => {

        // Refactorizar

        const objParams = {
            public_key:"TEST-bba46849-53c0-42df-aca8-7d551bdb09b1",
            locale: "en",
            js_version: "2.0.0"
        }

        const params = new URLSearchParams(objParams).toString();
        const endpoint = "/v1/card_tokens";
        const url = "https://api.mercadopago.com";

        const form = {
            card_number: "5031755734530604",
            cardholder: {
                name: "APRO",
                identification: {
                    type: "DNI",
                    number: "01111111"
                }
            },
            security_code: "123",
            expiration_month: "11",
            expiration_year: "2025"
        }

        const res = await request(`${url}`)
        .post(`${endpoint}?${params}`)
        .send(form);

        const cardForm = {
            token: res.body.id,
            issuer_id: "3",
            payment_method_id: "master",
            transaction_amount: 100,
            installments: 1,
            payer: {
                email: "test_user_14941830@testuser.com",
                identification: res.body.cardholder.identification
            }
        }

        const response = await request(baseURL)
        .post("/api/payment/reserve")
        .send(cardForm);

        expect(response.statusCode).toBe(200);

        console.log(response.body);
    });
});