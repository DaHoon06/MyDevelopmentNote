import express from "express";
import boardController from "./board/boardController";
import userController from './user/userController';
import verifyTokenController from "./user/verifyTokenController";

const controller : express.Application = express();

controller.use('/board',boardController);
controller.use('/user',userController);
controller.use('/verify',verifyTokenController);

export default controller;