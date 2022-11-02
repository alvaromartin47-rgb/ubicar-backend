export const bodyUser1 = {
    email: "alvaro.martin@live.com.ar"
}

export const bodyUser2 = {
    email: "alvaro.martin1307@gmail.com"
}

export const bodyTrip = {
    datetime: 1667096087000,
    routeNodes: [
        { cityId: "02000010000" },
        { cityId: "42021020000" }
    ],
    transportId: "123213",
    passengers: {
        cost: 1500,
        count: 2,
        smoking: false,
        pets: true,
        extraSpace: "yes"
    }
}

export const formInfoCard = {
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

export const paramsToGetCardToken = {
    public_key:"TEST-bba46849-53c0-42df-aca8-7d551bdb09b1",
    locale: "en",
    js_version: "2.0.0"
}