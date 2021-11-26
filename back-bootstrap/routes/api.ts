import {NextFunction, Request, Response, Router} from 'express';

import todo from "./ToDo";
import board from './Board/index'
const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    return res.json({});
});

router.use('/todoList',todo);
router.use('/board',board);

export default router;