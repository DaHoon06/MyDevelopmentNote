import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from "@nestjs/common";
import {Request, Response} from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{ // 모든 예외 필터는 ExceptionFilter<T> 구현 받아야한다.
    catch(exception: any, host: ArgumentsHost): any { // 구현과 함께 catch(exception: T, host: ArgumentsHost) 메서드를 제공해야 한다.
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();
        const status = exception.getStatus();

        res.status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toDateString(),
                path: req.url,
            });
    }
}