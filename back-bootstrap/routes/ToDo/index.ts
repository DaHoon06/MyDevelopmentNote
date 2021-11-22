import { NextFunction, Request, Response, Router } from 'express';
import { TodoController } from "../../controller/TodoController";

const router = Router();
const tc = new TodoController();

// router.get('*', AUTH).post('*', AUTH).put('*', AUTH).patch('*', AUTH).delete('*', AUTH);

router.post('/insert',async (req: Request, res: Response, next: NextFunction) => {
   try{
      const data = await req.body;
      const { result } = await tc.insertData_ToDo(data);

      if(result){
         return {result: true}
      }

      return {result: false}
   } catch (e: any) {
      throw new Error(e);
   }
});

router.get('/',async (req: Request, res: Response, next: NextFunction) => {
   try{

   } catch (e: any) {
      throw new Error(e);
   }
})

export default router;