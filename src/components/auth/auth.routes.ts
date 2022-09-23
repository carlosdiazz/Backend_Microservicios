import { Router } from "express";
import * as authServices from './auth.service'
import passport from 'passport'

const routerAuth = Router()

routerAuth.post(
    '/signup',
    authServices.signup
)

routerAuth.post(
    '/login',
    authServices.login
)

routerAuth.post(
    '/me',
    passport.authenticate('jwt', {session: false}),
    authServices.profileMe
)

export default routerAuth