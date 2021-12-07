import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        //보통 JWT 검증 정보 입력
        request.user = {
            name: 1,
            email: 'a@naver.com'
        }

        return true;
    }
}