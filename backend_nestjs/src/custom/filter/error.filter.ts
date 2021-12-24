import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ErrorFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = status === 401 ? '토큰이 만료되었습니다.' : exception.message;
        res.status(status).json({
            result: false,
            message,
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: req.url,
        });
    }
}