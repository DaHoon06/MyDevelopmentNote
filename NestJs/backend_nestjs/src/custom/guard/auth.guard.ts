// import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
// import {Observable} from "rxjs";
// import {AuthService} from "../../modules/auth/auth.service";
// import { Request } from 'express';
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(private authService: AuthService) {
//     }
//     canActivate(store: ExecutionContext
//     ): boolean | Promise<boolean> | Observable<boolean> {
//         const request = store.switchToHttp().getRequest();
//
//         //보통 JWT 검증 정보 입력
//         // request.user = {
//         //     name: 1,
//         //     email: 'a@naver.com'
//         // }
//         //
//         // return true;
//         return this.validateRequest(request);
//     }
//
//     private validateRequest(request: Request) {
//         const jwtString = request.headers.authorization.split('Bearer ')[1];
//
//         this.authService.verify(jwtString);
//
//         return true;
//     }
// }