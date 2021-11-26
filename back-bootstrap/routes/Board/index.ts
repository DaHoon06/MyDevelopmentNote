import { NextFunction, Request, Response, Router } from 'express';
import { BoardController } from "../../controller/BoardController";

const router = Router();
const bc = new BoardController();

router.get('/:page?',async (req: Request, res: Response, next: NextFunction) => {
    try{
        const page = req.query;
        const data = await bc.getBoardList(page);
        return res.status(200).send(data);
    } catch (e: any) {
        throw new Error(e);
    }
})

export default router;