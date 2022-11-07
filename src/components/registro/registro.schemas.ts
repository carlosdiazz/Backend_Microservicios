import {z} from 'zod';
import {TANDAS_ENUM_USERS} from '../../libs/Enums'
import boom from '@hapi/boom'

const id = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
const id_user = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
//const id_anterior = z.string()

const date = z.preprocess((arg) => {try{
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    else throw boom.badData("No es una fecha valida")
}catch(error){
    throw boom.badData("No es una fecha valida")
}}, z.date());//!Falta esto

const tanda = z.nativeEnum(TANDAS_ENUM_USERS)

const tandas =z.object({
    tanda: tanda,
    hora_entrada: date,
    hora_salida: date
})

export const createOneRegistro = z.object({
    body: z.object({
        id_user: id_user,
        date: date,
        tandas: tandas,
    })
})

export const updateOneRegistro = z.object({
    params: z.object({
        id: id
    }),
    body: z.object({
        id_user: id_user.optional(),
        date: date.optional(),
    })
})

export const getOneRegistro = z.object({
    params: z.object({
        id: id
    })
})

export const getAllRegistro = z.object({
    query: z.object({
        id_user: id_user.optional(),
        date_inicial :  date.optional(),
        date_final : date.optional()
    })
})