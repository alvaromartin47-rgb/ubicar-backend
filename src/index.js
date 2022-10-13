import dotenv from 'dotenv';

dotenv.config();

import server from './server';
import "./services/db/db";

server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});