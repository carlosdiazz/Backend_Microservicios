import {z} from 'zod';

const hora = z.string()
const id = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
const id_docentes = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
const date = z.string() //!Falta esto
const horas = z.array(hora) //!Falta esto

export const createOneRegistro = z.object({
    body: z.object({
        id_docentes: id_docentes,
        date: date,
        horas: horas
    })
})

export const updateOneRegistro = z.object({
    params: z.object({
        id: id
    }),
    body: z.object({
        id_docentes: id_docentes.optional(),
        date: date.optional(),
        horas: horas.optional()
    })
})

export const getOneRegistro = z.object({
    params: z.object({
        id: id
    })
})