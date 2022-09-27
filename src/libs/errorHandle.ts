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
        next(err);
    }
}

//!Arregalr el envio de errores de Mongo
export const mongoErrorHandler = (err, _req: Request, res: Response, next: NextFunction) => {
    if(err.name==='MongoServerError' || err.name === 'ValidationError' || err.name === 'CastError'){
        res.status(409).json({
            data:err.name,
            message: err.message,
            statusCode: 409,
            error: true,

        })
    }else{
        next(err);
    }
}

export const jsonErrorHandler = (err, _req: Request, res: Response, next: NextFunction) => {
    if(err.message.startsWith('Unexpected token')){
        res.status(400).json({
            data:err.name,
            message: err.message,
            statusCode: 409,
            error: true,

        })
    }else{
        next(err);
    }
}

export const errorResponse = (err, _req: Request, res: Response, _next: NextFunction) => {
    //console.log(err)
    res.status(500).json({
        data: err,
        message: err.message || '',
        statusCode: 500,
        error: err.name || ''
    });
};