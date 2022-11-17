import dotenv from "dotenv";

dotenv.config();

import "../db/db";
import axios from 'axios';
import Token from "./Token";

import ReserveSchema from "../db/models/ReserveSchema";

async function checkExpirationReservations(res) {
    const analized = res.length;
    let revoked = 0;
    
    for (let r of res) {
        try {
            Token.verify(
                r.access_token,
                process.env.PRIVATE_PWD_RESERVATION
            );
        } catch(err) {
            if (r.status === "accepted") break;

            const access_token = Token.generate(
                {userId: 1234}, 
                60*60, 
                process.env.PRIVATE_PWD
            );

            const res = await axios.post(
                "http://ubicar_api_dev:4000/api/trip/reservation/cancel/",
                {access_token},
                {headers: {'authorization': `Basic ${r.access_token}`}}
            );
            
            console.log(res);
            revoked++;
        }
    }

    console.log("Finalize checks");
    console.log(`Analized: ${analized}`);
    console.log(`Revoked: ${revoked}`);

    process.exit();
}

function main() {
    ReserveSchema.find()
    .then(checkExpirationReservations)
    .catch(console.log);
}

main()