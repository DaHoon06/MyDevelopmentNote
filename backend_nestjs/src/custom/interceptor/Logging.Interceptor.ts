import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log('인터셉터 전 Log...');

        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => console.log('인터셉터 후 Log...' + now)),
            );
    }
}