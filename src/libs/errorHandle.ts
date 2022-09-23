import {NextFunction, Request, Response} from 'express';
//import boo

export const BoomErrorHandler = (err, _req: Request, res: Response, next: NextFunction) =>{
    if(err.isBoom) {
        res.status(err.output.statusCode).json({
            data: {},
            message: err.output.payload.message,
            statusCode: err.output.statusCode,
            error: err.output.payload.error,
        })
    }else{
        next();
    }
}

export const errorResponse = (err, _req: Request, res: Response, _next: NextFunction) => {

    res.status(500).json({
        data: err,
        message: err.message,
        statusCode: 500,
        error: err.stack
    });
};