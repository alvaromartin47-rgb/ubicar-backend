import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import routes from "./routes";
import catchErrors from "./middlewere";

const app = express();

app.use(helmet());
app.disable('x-powered-by');

app.use(cors({"origin": "*"}));
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(
    express.static(
        path.join(
            __dirname, './views'
)));

app.use(catchErrors);

routes(app);

export default app;