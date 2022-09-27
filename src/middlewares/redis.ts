import { Request, Response, NextFunction } from 'express';
import {obtener_redis} from '../cache/redis';
import {successResponse} from '../libs/response'

export const buscarEnCache =async (req: Request, res: Response, next: NextFunction) => {

    try {
        const key = req.user as string
        const data = await obtener_redis(key)
        if(data){
            console.log('Estaba en cache')
            const dataRedis = JSON.parse(data)
            successResponse(req, res, dataRedis, 'Datos Obtenidos', 200)
        }else{
            console.log('No estaba en cache')
            next()
        }
    } catch (err) {
        console.log("ENTRoOOOO")
        next(err)
    }
};

