import {z} from 'zod';

const id = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);


export const getOneUserSchema = z.object({
    params: z.object({
        id: id
    })
})