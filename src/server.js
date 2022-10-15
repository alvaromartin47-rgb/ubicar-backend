import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';

// Server CFG

const app = express();

app.use(helmet());
app.disable('x-powered-by');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, './views')));

// Routes

import googleAuth from './routes/googleAuth';
app.use("/api/auth/google/signin", googleAuth);

import signUp from './routes/signUp';
app.use("/signUp", signUp);

import users from './routes/users';
app.use("/users", users);

import login from './routes/login';
app.use("/login", login);

export default app;