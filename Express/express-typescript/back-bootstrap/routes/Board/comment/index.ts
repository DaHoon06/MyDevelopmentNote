import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.get('/b/:id',async (req: Request, res: Response, next: NextFunction) => {

});

export default router;