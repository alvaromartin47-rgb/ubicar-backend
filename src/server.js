import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';

// Server CFG

const app = express();

app.use(helmet());
app.disable('x-powered-by');

app.use(cors({"origin": "*"}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(
    express.static(path.join(__dirname, './views'))
);

// Routes

import user from './routes/user';
app.use("/api/user", user);

import trip from './routes/trip';
app.use("/api/trip", trip);

import city from './routes/city';
app.use("/api/city", city);

import googleAuth from './routes/googleAuth';
app.use("/api/auth/google/signin", googleAuth);

// Test

import cards from './routes/cards';
app.use("/cards", cards);

// Old

// import signUp from './routes/signUp';
// app.use("/signUp", signUp);

// import users from './routes/users';
// app.use("/users", users);

// import login from './routes/login';
// app.use("/login", login);

export default app;