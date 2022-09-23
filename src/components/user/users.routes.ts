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
    userService.createUser
)

userRouters.put(
    '/:id',
    userService.updateUser
)

userRouters.delete(
    '/:id',
    userService.deleteUser
)

export default userRouters;