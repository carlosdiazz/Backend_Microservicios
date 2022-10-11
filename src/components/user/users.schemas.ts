import {z} from 'zod';
import {Departamento_Users} from '../../libs/Enums'

const id = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
const name = z.string()
const cedula = z.string().min(11).max(12).regex(/^[0-9]{11}$/) //! Falta esto
const departamento = z.nativeEnum(Departamento_Users)
const id_anterior = z.string()
//const departamento = z.string()

export const createUserSchema = z.object({
    body: z.object({
        name: name,
        cedula: cedula,
        departamento: departamento,
        id_anterior: id_anterior
    })
})

export const updateUserSchema = z.object({
    params: z.object({
        id: id
    }),
    body: z.object({
        name: name.optional(),
        cedula: cedula.optional(),
        departamento: departamento.optional(),
        id_anterior: id_anterior.optional()
    })
})

export const getOneUserSchema = z.object({
    params: z.object({
        id: id
    })
})

export const deleteUserSchema = z.object({
    params: z.object({
        id: id
    })
})