import user from './routes/user';
import trip from './routes/trip';
import trips from './routes/trips';
import city from './routes/city';
import cities from './routes/cities';
import transports from './routes/transports';
import driver from './routes/driver';
import googleAuth from './routes/googleAuth';
import payment from './routes/payment';

export default function routes(app) {
    app.use("/api/user", user);
    app.use("/api/trip", trip);
    app.use("/api/trips", trips);
    app.use("/api/city", city);
    app.use("/api/cities", cities);
    app.use("/api/transports", transports);
    app.use("/api/driver", driver);
    app.use("/api/auth/google/signin", googleAuth);
    app.use("/api/payment", payment);

    // Test

    // import cards from './routes/cards';
    // app.use("/cards", cards);

    // Old

    // import signUp from './routes/signUp';
    // app.use("/signUp", signUp);

    // import users from './routes/users';
    // app.use("/users", users);

    // import login from './routes/login';
    // app.use("/login", login);
}