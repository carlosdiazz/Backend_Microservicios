import { Router } from "express";
import {validarSchemas} from '../../libs/validarSchemas'
import * as userService from './users.service'
import * as userSchema from './users.schemas'

const userRouters = Router()

userRouters.get(
    '/',
    userService.getAllUsers
)

userRouters.get(
    '/:id',
    validarSchemas(userSchema.getOneUserSchema),
    userService.getOneUser
)

userRouters.post(
    '/',
    validarSchemas(userSchema.createUserSchema),
    userService.createUser
)

userRouters.put(
    '/:id',
    validarSchemas(userSchema.updateUserSchema),
    userService.updateUser
)

userRouters.delete(
    '/:id',
    validarSchemas(userSchema.deleteUserSchema),
    userService.deleteUser
)

export default userRouters;