import boom from '@hapi/boom'
import {Request,Response, NextFunction} from 'express'
import RegistroModel from './registro.model'
import UserModel from '../user/users.model'
import {successResponse} from '../../libs/response'
import {comprobarUser} from '../../libs/ComprobarClaveSecundaria'
import { calculoDeHora } from '../../libs/CalculoDeHora'
import {agregar_tanda} from './libs.registros'

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

export const getIdOneRegistro = async(req:Request, res: Response, next: NextFunction ) => {
    try{
        const {id_anterior} = req.params
        const user = await UserModel.findOne({id_anterior : id_anterior})
        if(!user){
            throw boom.notFound(`Este regsitro ${id_anterior} no fue encontrado`)
        }

        successResponse(req,res, user, 'Lista de un registro', 200)
    }catch(err){
        next(err)
    }
}

export const getAllRegistro = async(req:Request, res: Response, next: NextFunction ) => {
    try{
        let filter = {}
        let ordenar = {}
        const {id_user, date_inicial, date_final} = req.query
        ordenar['id_user']=1
        ordenar['date']=1
        if(id_user){
            filter['id_user']=id_user
        }
        if(date_inicial as string && date_final as string){
            filter['date'] = {
                $gte: new Date(date_inicial as string),
                $lt: new Date(date_final as string)
            }
        }

        const registros = await RegistroModel.find(filter).sort(ordenar).populate('id_user','name ')
        if(!registros){
            throw boom.badData("Error al buscar los registro")
        }
        //console.log(registros[0].hora_salida.getHours())
        successResponse(req,res, registros, 'Lista de todos los registro', 200)
    }catch(err){
        next(err)
    }
}

export const createRegistro = async(req:Request, res: Response, next: NextFunction ) => {
    try{
        const { id_user, date, tandas} = req.body
        const {hora_entrada, hora_salida, tanda } = tandas
        await comprobarUser(id_user)
        if (!hora_entrada || !hora_salida || !tanda) {
            throw boom.badData("Falta algun dato en el Object de Tanda")
        }

        const agregar_solo_tanda = await RegistroModel.findOne({ id_user, date })
        if (agregar_solo_tanda) {
            const calculo_hora = await calculoDeHora(new Date(hora_entrada), new Date(hora_salida))
            const newTandasAgregar = {
                tanda: tanda,
                hora_entrada: new Date(hora_entrada),
                hora_salida: new Date(hora_salida),
                total_hora: calculo_hora
            }
            const arrayTandas = agregar_solo_tanda.tandas
            const newTandas = agregar_tanda(arrayTandas, newTandasAgregar, tanda)
            const userUpdate = await RegistroModel.findByIdAndUpdate(agregar_solo_tanda._id, {
                tandas: newTandas
            },{new: true})
            if(!userUpdate){
                throw boom.badData("No fue posible actualizar el registro")
            }

            successResponse(req,res, userUpdate, 'Se agrego otra tanda a un registro', 201)
        } else {
            const calculo_hora = await calculoDeHora(new Date(hora_entrada), new Date(hora_salida))
            const newRegistro = new RegistroModel({
                date: new Date(date),
                id_user: id_user,
                tandas: [{
                    tanda: tanda,
                    hora_entrada: new Date(hora_entrada),
                    hora_salida: new Date(hora_salida),
                    total_hora: calculo_hora
                }],
            })
            const registroSaved = await newRegistro.save()
            if(!registroSaved){
                throw boom.badData("Error al crear el registro")
            }
            successResponse(req,res, registroSaved, 'Crear un registro', 201)
        }
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