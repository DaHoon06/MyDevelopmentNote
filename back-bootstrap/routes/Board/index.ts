import { NextFunction, Request, Response, Router } from 'express';
import { BoardController } from "../../controller/BoardController";
import { INTERFACES } from "../../src/interfaces/InterFaces";
import IBoard = INTERFACES.IBoard;

const router = Router();
const bc = new BoardController();

router.get('/:page?',async (req: Request, res: Response, next: NextFunction) => {
    try{
        const page = req.query.page;
        let { result, boardData, currentPage, totalPage } = await bc.getBoardList(page);

        const data = {
            result: true,
            boardData,
            currentPage,
            totalPage,
        }

        if(result){
            return res.status(200).send(data);
        } else {
            return res.status(500).send({result: false});
        }
    } catch (e: any) {
        throw new Error(e);
    }
})

router.post('/insert',async (req: Request, res: Response, next: NextFunction) => {
   try {
       const { title, writer, content } = req.body;
       const boardData = {
           title,writer,content
       }
       const { result } = await bc.insertData(boardData as IBoard) as {result: boolean};

       if(result) return res.status(200).send({result: true});
       return res.status(500).send({result: false});
   } catch (e: any) {
       throw new Error(e);
   }
});

export default router;