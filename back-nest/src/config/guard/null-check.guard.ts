import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class NullCheckGuard implements CanActivate{
    canActivate(
        context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const { path } = req.route as {path: string};
        const { page } = req.params;

        if(path.includes('boards') || path.includes('users')){
            if(!page) throw new Error('page 가 존재하지 않음');
        }
        return true;
    }
}