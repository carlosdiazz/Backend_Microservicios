import boom from '@hapi/boom'
import {Request,Response, NextFunction} from 'express'
import RegistroModel from './registro.model'
import {successResponse} from '../../libs/response'
import {comprobarUser} from '../../libs/ComprobarClaveSecundaria'
import {calculoDeHora} from '../../libs/CalculoDeHora'

export const getOneRegistro = async(req:Request, res: Response, next: NextFunction ) => {
    try{
        const {id} = req.params
        const user = await RegistroModel.findById(id).populate('id_user','name ')
        if(!user){
            throw boom.notFound("Este regsitro no fue encontrado")
        }

        successResponse(req,res, user, 'Lista de un registro', 200)
    }catch(err){
        next(err)
    }
}

export const getAllRegistro = async(req:Request, res: Response, next: NextFunction ) => {
    try{
        const registros = await RegistroModel.find().populate('id_user','name ')
        if(!registros){
            throw boom.badData("Error al buscar los registro")
        }
        successResponse(req,res, registros, 'Lista de todos los registro', 200)
    }catch(err){
        next(err)
    }
}

export const createRegistro = async(req:Request, res: Response, next: NextFunction ) => {
    try{
        const {id_user, date, tanda, hora_entrada, hora_salida} = req.body

        await comprobarUser(id_user)

        const validar_que_exista = await RegistroModel.findOne({id_user, tanda, date })

        if(validar_que_exista){
            throw boom.badData("Ya existe un registro con estos datos")
        }

        //!Falta esto arregalr el formato y calculo de hora 
        const calculo_hora = await calculoDeHora(hora_entrada, hora_salida)

        const newRegistro = new RegistroModel({
            date: date,
            id_user: id_user,
            tanda: tanda,
            hora_entrada: hora_entrada,
            hora_salida: hora_salida,
            total_hora: calculo_hora
        })

        const registroSaved = await newRegistro.save()
        if(!registroSaved){
            throw boom.badData("Error al crear el registro")
        }

        successResponse(req,res, registroSaved, 'Crear un registro', 201)
    }catch(err){
        next(err)
    }
}

export const deleteRegistro = async(req:Request, res: Response, next: NextFunction ) => {
    try{
        const {id} = req.params
        const user = await RegistroModel.findById(id).populate('id_user','name ')
        if(!user){
            throw boom.notFound("Este regsitro no fue encontrado")
        }
        const userDelete = await RegistroModel.findByIdAndRemove(id)
        if(!userDelete){
            throw boom.badData("Error al borrar el registro")
        }

        successResponse(req,res, user, 'Eliminar un registro', 200)
    }catch(err){
        next(err)
    }
}

export const actualizarRegistro = async(req:Request, res: Response, next: NextFunction ) => {
    try{

        const {id} = req.params
        const {id_user, date } = req.body
        if(id_user){
            await comprobarUser(id_user)
        }

        const user = await RegistroModel.findById(id)
        if(!user){
            throw boom.notFound("Este regsitro no fue encontrado")
        }
        const userUpdate = await RegistroModel.findByIdAndUpdate(id, {
            date: date,
            id_user: id_user
        }, {new: true})

        if(!userUpdate){
            throw boom.badData("No fue posible actualizar el registro")
        }

        successResponse(req,res, userUpdate, 'Actualizar un registro', 200)
    }catch(err){
        next(err)
    }
}