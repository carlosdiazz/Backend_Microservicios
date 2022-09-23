import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express';
import { ZodError, AnyZodObject} from "zod";


export const validarSchemas = (schema: AnyZodObject) => (req: Request, _res: Response, next: NextFunction) => {

    try {schema.parse({
        body: req.body,
        params: req.params
    })
    next()
    } catch (err) {
        if(err instanceof ZodError){
            throw boom.badRequest(err.issues.map(issue => `${issue.path[1]}: ${issue.message} => ${issue.code}`).join(', '));
        }
        throw boom.badRequest()
    }
};

