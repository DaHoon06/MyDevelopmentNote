import {NextFunction, Request, Response, Router} from 'express';

import todo from "./ToDo";

const router = Router();


router.use('/todoList',todo);

export default router;