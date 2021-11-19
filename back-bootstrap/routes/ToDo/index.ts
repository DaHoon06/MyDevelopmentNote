import { NextFunction, Request, Response, Router } from 'express';
import AUTH from '../common/auth';
import { DB } from '../../db/db';
import jwt from 'jsonwebtoken';
import { TodoController } from "../../controller/TodoController";

const router = Router();
const tc = new TodoController();

router.get('*', AUTH).post('*', AUTH).put('*', AUTH).patch('*', AUTH).delete('*', AUTH);

router.post('/insert',async (req: Request, res: Response, next: NextFunction) => {
   try{
      const { data } = req.body.data;
      const { result } = await tc.insertData_ToDo(data);
   } catch (e) {
      throw new Error(e);
   }
});

router.get('/',async (req: Request, res: Response, next: NextFunction) => {

})

export default router;