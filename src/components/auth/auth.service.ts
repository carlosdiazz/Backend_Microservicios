import jwt from 'jsonwebtoken'
import boom from '@hapi/boom'
import {Request,Response, NextFunction} from 'express'
import {successResponse} from '../../libs/response'
import {SECRET_JWT_TOKEN} from '../../config/config'
import {createUserTypeAdmin, loginUserTypeAdmin} from './auth.schemas'
import {comparePassword, encryptPassword} from '../../libs/cifrarContrasena'
import {insertar_redis} from '../../cache/redis'
import authModel from './auth.model.DB'


export const signup = async(req: Request, res: Response, next: NextFunction ) => {
    try{
        const data : createUserTypeAdmin = req.body
        const passwordEncrypted = await encryptPassword(data.password)

        const modelData = new authModel({
            name: data.name,
            nickname: data.nickname,
            email: data.email,
            password: passwordEncrypted
        })

        const dataSaved = await modelData.save()
        if(!dataSaved){
            throw boom.badRequest('Error al crear el usuario')
        }
        const payload = {
            name: dataSaved.name,
            nickname: dataSaved.nickname,
            emial: dataSaved.email
        }
        const token = jwt.sign(payload, SECRET_JWT_TOKEN)
        await insertar_redis(dataSaved.nickname, token)
        successResponse(req,res, {"token":token}, 'Usuario Creado', 200)
    }catch(err){
        next(err)
    }
}

export const login = async(req:Request, res: Response, next: NextFunction ) => {
    try{
        const data : loginUserTypeAdmin = req.body

        const user = await authModel.findOne({nickname: data.nickname})
        if(!user){
            throw boom.unauthorized("Unos de los datos es invalidos")
        }

        const comprobarContrasena = await comparePassword(data.password, user.password)
        if(!comprobarContrasena){
            throw boom.unauthorized("Unos de los datos es invalidos")
        }
        const payload = {
            nickanme: user.nickname,
            name    : user.name,
        }
        const token = jwt.sign(payload, SECRET_JWT_TOKEN)
        res.append('token',token)
        successResponse(req,res, {'token': token}, 'Login', 200)
    }catch(err){
        next(err)
    }
}

export const profileMe = async (req: Request, res: Response, next: NextFunction ) => {
    try{
        const key = req.user as string
        const data = JSON.stringify({"user":req.user})
        await insertar_redis(key, data)

        successResponse(req,res,{"user":req.user}, 'Profile Me', 200)
    }catch(err){
        next(err)
    }
}
