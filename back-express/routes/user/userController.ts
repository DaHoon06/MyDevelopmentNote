import express from "express";
import {User} from "../../src/db/model/UserModel";
import {CallbackError} from "mongoose";
import jwt from 'jsonwebtoken';
import {ENV} from "../../src/env.config";

const userController : express.Application = express();


userController.post('/login',(req: express.Request, res: express.Response) => {
    try{
        //토큰 생성
        let token = jwt.sign(
            {name: 'DAHOON'},
            ''+ENV.KEY_JWT,
            {
                subject: 'google_login_token',
                expiresIn: '1m',
                issuer: 'DAHOON'
            }
        );
        console.log('구글 로그인 : ',req.body.info+'  토큰 생성   :  '+token);

        let check = jwt.verify(token,''+ENV.KEY_JWT);
        if(check){
            console.log('검증됨',check,token);
            return res.status(200).json({
                userData: {
                    userInfo: check,
                    token: token,
                }
            });
        } else {
            return res.status(500).json({
                err: '500'
            })
        }
    } catch (e) {
        console.log(e);
    }

});

//JOIN
userController.post('/signUp',(req: express.Request, res: express.Response) => {
    console.log('USER POST !!!');
    const body = req.body;

    const userInfo = new User();

    userInfo.email = body.email;
    userInfo.pw = body.pw;
    userInfo.name = body.name;

    userInfo.save((err:CallbackError) => {
        if(err) {
            res.json({result : 0});
            return;
        }
        res.json({result : 1});
    })
});


//로그아웃
userController.get('/logout',(req: express.Request, res: express.Response) => {
})

export default userController;