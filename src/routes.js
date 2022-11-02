import user from './routes/user';
import trip from './routes/trip';
import trips from './routes/trips';
import city from './routes/city';
import cities from './routes/cities';
import transports from './routes/transports';
import driver from './routes/driver';
import auth from './routes/auth';
import payment from './routes/payment';

export default function routes(app) {
    app.use("/api/auth", auth);
    app.use("/api/user", user);
    app.use("/api/trip", trip);
    app.use("/api/trips", trips);
    app.use("/api/city", city);
    app.use("/api/cities", cities);
    app.use("/api/transports", transports);
    app.use("/api/driver", driver);
    app.use("/api/payment", payment);
}