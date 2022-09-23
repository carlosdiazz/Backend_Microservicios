//import boom from '@hapi/boom'
import {Request,Response, NextFunction} from 'express'
import {successResponse} from '../../libs/response'

export const getOneUser = async(req:Request, res: Response, next: NextFunction ) => {
    try{
        successResponse(req,res, {}, 'Lista de un usuarios', 200)
    }catch(err){
        next(err)
    }
}

export const getAllUsers = async(req:Request, res: Response, next: NextFunction ) => {
    try{
        successResponse(req,res, {}, 'Lista de todos los usuarios', 200)
    }catch(err){
        next(err)
    }
}

export const createUser = async(req:Request, res: Response, next: NextFunction ) => {
    try{
        successResponse(req,res, {}, 'Crear un usuarios', 200)
    }catch(err){
        next(err)
    }
}

export const updateUser = async(req:Request, res: Response, next: NextFunction ) => {
    try{
        successResponse(req,res, {}, 'Actualizar un usuarios', 200)
    }catch(err){
        next(err)
    }
}

export const deleteUser = async(req:Request, res: Response, next: NextFunction ) => {
    try{
        successResponse(req,res, {}, 'Lista de todos los usuarios', 200)
    }catch(err){
        next(err)
    }
}