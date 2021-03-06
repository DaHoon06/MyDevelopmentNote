import express from "express";
import {NextFunction, Request, Response} from 'express';
import cors from 'cors';

import api from "../routes/api";
import dotenv from 'dotenv';

const path = require('path');
const cookieParser = require('cookie-parser');

const app: express.Application = express();

app.set('pages', path.join(__dirname, 'pages'));
app.set('view engine', 'ejs');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb',extended: true }));
app.use(express.static(path.join(__dirname, '../docs')));
app.use(cookieParser());
app.use(cors());
dotenv.config();

//--------- ROUTING ----------
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin','*');
    return res.status(200).send({});
});
app.use('/api',api);


export default app;