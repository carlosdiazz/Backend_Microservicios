import { Router } from "express";
import passport from 'passport'
import {validarSchemas} from '../../libs/validarSchemas'
import * as authServices from './auth.service'
import * as authSchemas from './auth.schemas'

const routerAuth = Router()

routerAuth.post(
    '/signup',
    validarSchemas(authSchemas.createUser),
    authServices.signup
)

routerAuth.post(
    '/login',
    validarSchemas(authSchemas.loginUser),
    authServices.login
)

routerAuth.post(
    '/me',
    passport.authenticate('jwt', {session: false}),
    authServices.profileMe
)

export default routerAuth