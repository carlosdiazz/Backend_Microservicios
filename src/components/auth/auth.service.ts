import jwt from 'jsonwebtoken'
//import boom from '@hapi/boom'
import {Request,Response, NextFunction} from 'express'
import {successResponse} from '../../libs/response'
import {SECRET_JWT_TOKEN} from '../../config/config'

export const signup = async(req:Request, res: Response, next: NextFunction ) => {
    try{

        successResponse(req,res, {}, 'Usuario Creado', 200)
    }catch(err){
        next(err)
    }
}

export const login = async(req:Request, res: Response, next: NextFunction ) => {
    try{
        //!Qui valido el user para crear el token
        const user = {'name':'carlos',"apellido":"diaz","age":"12"}
        const token = jwt.sign({'ROLE':user}, SECRET_JWT_TOKEN)
        successResponse(req,res, {'TOKEN': token}, 'Login', 200)
    }catch(err){
        next(err)
    }
}

export const profileMe = async(req:Request, res: Response, next: NextFunction ) => {
    try{
        successResponse(req,res, {}, 'Profile Me', 200)
    }catch(err){
        next(err)
    }
}
