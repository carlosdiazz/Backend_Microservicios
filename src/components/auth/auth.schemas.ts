import {z} from 'zod';

const id = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
const nickname = z.string().min(5)
const name = z.string().min(4)
const email = z.string()
const password = z.string().min(8)
const is_staff = z.boolean()

export const createUser = z.object({
    body: z.object({
        name: name,
        nickname: nickname,
        email: email,
        password: password,
        is_staff: is_staff
    })
})

export const loginUser = z.object({
    body: z.object({
        nickname: nickname,
        password: password
    })
})


export const getOneUserSchema = z.object({
    params: z.object({
        id: id
    })
})

export type createUserTypeAdmin = z.infer<typeof createUser>['body']
export type loginUserTypeAdmin  = z.infer<typeof loginUser>['body']