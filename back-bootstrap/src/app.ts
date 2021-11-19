import express from "express";
import {NextFunction, Request, Response} from 'express';

import api from "../routes/api";

const path = require('path');
const cookieParser = require('cookie-parser');

const app: express.Application = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());

//--------- ROUTING ----------

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send({});
});
app.use('/api',api);


export default app;