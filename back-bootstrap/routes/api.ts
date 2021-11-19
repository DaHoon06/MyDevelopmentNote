import {NextFunction, Request, Response, Router} from 'express';

import todo from "./ToDo";

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    return res.json({});
});

router.use('/todoList',todo);

export default router;