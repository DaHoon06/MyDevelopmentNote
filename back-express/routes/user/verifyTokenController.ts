import express from "express";
import jwt from 'jsonwebtoken';

const verifyTokenController : express.Application = express();

//토큰 유효성 검사
verifyTokenController.get('/',(req: express.Request, res: express.Response) => {

});

export default verifyTokenController;