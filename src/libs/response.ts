import { Request, Response} from 'express';
//import boo

export const successResponse = (_req: Request<unknown,unknown, unknown>, res: Response, data:object, message: string, status: number) => {
    res.status(status || 200).json({
        data: data || {},
        message: message || "Succes",
        statusCode : status || 200,
        error : false
    });
};
