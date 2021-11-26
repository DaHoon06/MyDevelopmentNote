import {NextFunction, Request, Response, Router} from 'express';
import {TodoController} from "../../controller/TodoController";

const router = Router();
const tc = new TodoController();

// router.get('*', AUTH).post('*', AUTH).put('*', AUTH).patch('*', AUTH).delete('*', AUTH);

router.get('/',async (req: Request, res: Response, next: NextFunction) => {
   try{
      const { result, exists } = await tc.getTodoList();
      if(result){
         return res.status(200).send(exists);
      }
   } catch (e: any) {
      throw new Error(e);
   }
})

router.post('/insert',async (req: Request, res: Response, next: NextFunction) => {
   try{
      const data = await req.body;
      const { result } = await tc.insertData_ToDo(data);

      if(result){
         return res.status(201).send({result: true})
      }
      return {result: false}
   } catch (e: any) {
      throw new Error(e);
   }
});

router.patch('/do/:id',async (req: Request, res: Response, next: NextFunction) => {
   try {
      const id = req.params.id;
      const { result } = await tc.doing(id);

      if(result){
         return res.status(201).send({result: true})
      }
      return {result: false}
   } catch (e: any) {
      throw new Error(e);
   }
});

router.patch('/delete/:id',async (req: Request, res: Response, next: NextFunction) => {
   try {
      const id = req.params.id;
      const { result } = await tc.deleteData(id);
      if(result){
         return res.status(201).send({result: true})
      }
      return {result: false}
   } catch (e: any) {
      throw new Error(e);
   }
});

router.get('/chartData',async (req: Request, res: Response, next: NextFunction) => {
   try {

   } catch (e: any) {
      throw new Error(e);
   }
})

export default router;