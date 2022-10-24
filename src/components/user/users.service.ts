import boom from '@hapi/boom'
import {Request,Response, NextFunction} from 'express'
import {successResponse} from '../../libs/response'
import UserModel from './users.model'

export const getOneUser = async(req:Request, res: Response, next: NextFunction ) => {
    try{

        const {id} = req.params
        const user = await UserModel.findById(id)
        if(!user){
            throw boom.notFound("Este usuario no se ecnontro")
        }
        successResponse(req,res, user, 'Lista de un usuarios', 200)
    }catch(err){
        next(err)
    }
}

export const getAllUsers = async(req:Request, res: Response, next: NextFunction ) => {
    try{

        const users = await UserModel.find()
        if(!users){
            throw boom.notFound("Este usuario no se ecnontro")
        }
        successResponse(req,res, users, 'Lista de todos los usuarios', 200)
    }catch(err){
        next(err)
    }
}

export const createUser = async(req:Request, res: Response, next: NextFunction ) => {
    try{

        const {name, cedula, departamento, id_anterior} = req.body

        const newUser = new UserModel({
            name: name,
            cedula: cedula,
            departamento: departamento,
            id_anterior: id_anterior
        })

        const userSaved = await newUser.save()
        if(!userSaved){
            throw boom.badData("No se pudo gurdar el usurio")
        }
        successResponse(req,res, userSaved, 'Crear un usuarios', 201)
    }catch(err){
        next(err)
    }
}

export const updateUser = async(req:Request, res: Response, next: NextFunction ) => {
    try{
        const {id} = req.params
        const {name, cedula, departamento, id_anterior} = req.body
        const user = await UserModel.findById(id)
        if(!user){
            throw boom.notFound("Este usuario no se ecnontro")
        }

        const userUpdate = await UserModel.findByIdAndUpdate(id, {
            name: name,
            cedula: cedula,
            departamento: departamento,
            id_anterior: id_anterior
        },{new: true})

        if(!userUpdate){
            throw boom.notFound("Este usuario no se pudo actualizar")
        }

        successResponse(req,res, userUpdate, 'Actualizar un usuarios', 200)
    }catch(err){
        next(err)
    }
}

export const deleteUser = async(req:Request, res: Response, next: NextFunction ) => {
    try{
        const {id} = req.params
        const user = await UserModel.findById(id)
        if(!user){
            throw boom.notFound("Este usuario no se encontro")
        }
        const userRemoved = await UserModel.findByIdAndDelete(id)

        if(!userRemoved){
            throw boom.badData("No se pudo eliminar el usurio")
        }

        successResponse(req,res, user, 'Se eliminio un usuario', 200)
    }catch(err){
        next(err)
    }
}