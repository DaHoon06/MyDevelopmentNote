// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';
//
// @Injectable()
// export class BoardCheckGuard implements CanActivate{
//     canActivate(store: ExecutionContext
//     ): boolean | Promise<boolean> | Observable<boolean> {
//         const req = store.switchToHttp().getRequest();
//         const { path } = req.route as { path: string };
//
//         //uri 경로에 해당 문구가 포함되면 에러를 던져줌 -> vue 에서 vue-toast 를 통하여 에러 메세지 출력
//         // const { BSEQ, pageNum } = req.params;
//         // if(path.includes('getBoardList') || path.includes('reply')) {
//         //     if(!pageNum) throw new Error('pageNumber가 존재하지 않습니다.');
//         //     // if(!BSEQ) throw new Error('BSEQ(게시번호)가 존재하지 않습니다.');
//         // }
//         // return true;
//     }
// }