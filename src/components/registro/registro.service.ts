import {Request,Response, NextFunction} from 'express'
import {successResponse} from '../../libs/response'

export const getOneRegistro = async(req:Request, res: Response, next: NextFunction ) => {
    try{

        successResponse(req,res, {}, 'Lista de un registro', 200)
    }catch(err){
        next(err)
    }
}

export const getAllRegistro = async(req:Request, res: Response, next: NextFunction ) => {
    try{

        successResponse(req,res, {}, 'Lista de todos los registro', 200)
    }catch(err){
        next(err)
    }
}

export const createRegistro = async(req:Request, res: Response, next: NextFunction ) => {
    try{

        successResponse(req,res, {}, 'Crear un registro', 200)
    }catch(err){
        next(err)
    }
}

export const deleteRegistro = async(req:Request, res: Response, next: NextFunction ) => {
    try{

        successResponse(req,res, {}, 'Eliminar un registro', 200)
    }catch(err){
        next(err)
    }
}

export const actualizarRegistro = async(req:Request, res: Response, next: NextFunction ) => {
    try{

        successResponse(req,res, {}, 'Actualizar un registro', 200)
    }catch(err){
        next(err)
    }
}