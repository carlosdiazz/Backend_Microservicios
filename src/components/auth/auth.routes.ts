import { Router } from "express";
import passport from 'passport'
import {validarSchemas} from '../../libs/validarSchemas'
import * as authServices from './auth.service'
import * as authSchemas from './auth.schemas'
//import {buscarEnCache} from '../../middlewares/redis'

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

//Te envia el nickname y te devuelve el token
routerAuth.get(
    '/me',
    passport.authenticate('jwt', {session: false}),
    //buscarEnCache,
    authServices.profileMe
)

export default routerAuth