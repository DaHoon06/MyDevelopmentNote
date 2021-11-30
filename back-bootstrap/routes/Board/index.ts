import { NextFunction, Request, Response, Router } from 'express';
import { BoardController } from "../../controller/BoardController";
import { INTERFACES } from "../../src/interfaces/InterFaces";
import IBoard = INTERFACES.IBoard;
import comment from './comment/index';

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
            return res.status(201).send(data);
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
       } as IBoard;
       const { result } = await bc.insertData(boardData) as {result: boolean};

       if(result) return res.status(201).send({result: true});
       return res.status(500).send({result: false});
   } catch (e: any) {
       throw new Error(e);
   }
});

router.get('/b/:id',async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id;
        const { data } = await bc.detailData(id);

        if(data) return res.status(200).send(data);
        return res.status(500).send({result: false});
    } catch (e: any) {
        throw new Error(e);
    }

});

router.patch('/delete/:id',async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id;
        const { result } = await bc.deleteData(id);

        if(result) return res.status(200).send(result);
        return res.status(500).send(result);
    } catch (e: any) {
        throw new Error(e);
    }
});

router.use('/comment',comment);

export default router;