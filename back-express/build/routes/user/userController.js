"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var UserModel_1 = require("../../src/db/model/UserModel");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var env_config_1 = require("../../src/env.config");
var userController = express_1.default();
userController.post('/login', function (req, res) {
    try {
        //토큰 생성
        var token = jsonwebtoken_1.default.sign({ name: 'DAHOON' }, '' + env_config_1.ENV.KEY_JWT, {
            subject: 'google_login_token',
            expiresIn: '1m',
            issuer: 'DAHOON'
        });
        console.log('구글 로그인 : ', req.body.info + '  토큰 생성   :  ' + token);
        var check = jsonwebtoken_1.default.verify(token, '' + env_config_1.ENV.KEY_JWT);
        if (check) {
            console.log('검증됨', check, token);
            return res.status(200).json({
                userData: {
                    userInfo: check,
                    token: token,
                }
            });
        }
        else {
            return res.status(500).json({
                err: '500'
            });
        }
    }
    catch (e) {
        console.log(e);
    }
});
//JOIN
userController.post('/signUp', function (req, res) {
    console.log('USER POST !!!');
    var body = req.body;
    var userInfo = new UserModel_1.User();
    userInfo.email = body.email;
    userInfo.pw = body.pw;
    userInfo.name = body.name;
    userInfo.save(function (err) {
        if (err) {
            res.json({ result: 0 });
            return;
        }
        res.json({ result: 1 });
    });
});
//로그아웃
userController.get('/logout', function (req, res) {
});
exports.default = userController;
//# sourceMappingURL=userController.js.map