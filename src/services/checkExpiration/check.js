import dotenv from "dotenv";

dotenv.config();

import "../db/db";
import Token from "./Token";

import ReserveSchema from "../db/models/ReserveSchema";

async function checkExpirationReservations(res) {
    const analized = res.length;
    let revoked = 0;
    
    for (let r of res) {
        try {
            await Token.verify(r.accessToken, process.env.PRIVATE_PWD_RESERVATION);
        } catch(err) {
            if (r.status === "accepted") break;
            await ReserveSchema.findByIdAndRemove(r.id)
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