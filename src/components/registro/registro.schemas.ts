import {z} from 'zod';
import {TANDAS_ENUM_USERS} from '../../libs/Enums'

const id = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
const id_user = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
const date = z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    else throw Error("No es una fecha valida")
  }, z.date());//!Falta esto
const hora_entrada = date //!Falta esto
const hora_salida  = date
const tanda = z.nativeEnum(TANDAS_ENUM_USERS)

export const createOneRegistro = z.object({
    body: z.object({
        id_user: id_user,
        date: date,
        tanda: tanda,
        hora_entrada: hora_entrada,
        hora_salida: hora_salida
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
        id_user: id_user.optional()
    })
})