import express from "express";
import * as dotenv from 'dotenv';
const { Strategy: LocalStrategy } = require('passport-local');
import controller from "../routes/controller";
const mongoose = require('mongoose');
import {ENV} from "./env.config";

dotenv.config();

const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//------ DB -------
/*
const { MongoClient } = require('mongodb');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const dbUri = process.env.NODE_ENV === 'development' ? 'mongodb://localhost:27017/test1' : `mongodb://localhost:27017/test1`
const store = new MongoDBStore({
    uri: dbUri,
    databaseName: 'test1',
    collection: 'sessions',
});
*/

mongoose.connect(process.env.Mongoose_URI);

let db = mongoose.connection;

db.on('error',console.error);
db.once('open',function(){
    console.log('DB CONNECTED!!');
});


const app: express.Application = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: true}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());



/*
app.use(session({
    secret: 'DAHOON',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store,
}));
const db = new MongoClient(dbUri, {
    useUnifiedTopology: true,
});


(async () => {
    try {
        await db.connect();
        console.log('DB CONNECTED!!');
        console.log('app READY!!!');
    } catch (e) {
        setTimeout(function () {
            process.on("exit", function () {
                require("child_process").spawn(process.argv.shift(), process.argv, {
                    cwd: process.cwd(),
                    detached : true,
                    stdio: "inherit"
                });
            });
            process.exit();
        }, 5000);
    }
})();
*/
//--------- ROUTING ----------
app.use('/api',controller);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err:any, req:any, res:any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;