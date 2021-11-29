"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//import cors from 'cors';
var api_1 = __importDefault(require("../routes/api"));
var dotenv_1 = __importDefault(require("dotenv"));
var path = require('path');
var cookieParser = require('cookie-parser');
var app = (0, express_1.default)();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(express_1.default.static(path.join(__dirname, '../public')));
app.use(cookieParser());
//app.use(cors());
dotenv_1.default.config();
//--------- ROUTING ----------
app.get('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    return res.status(200).send({});
});
app.use('/api', api_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map