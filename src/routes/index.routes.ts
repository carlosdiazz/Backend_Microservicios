import {Router} from 'express'
import {Application, Request, Response, NextFunction} from 'express'
import userRouter from '../components/user/users.routes'
import authRouter from '../components/auth/auth.routes'
import boom from '@hapi/boom'

const routerAPI = (app: Application) => {

    const routerV1 = Router()

    app.use('/api/v1', routerV1)
        routerV1.use('/auth', authRouter)
        routerV1.use('/users', userRouter)

    app.all('*', (_req: Request, _res: Response, next: NextFunction ) => {
        next(boom.notFound("la ruta no existe"))
    })

}

export default routerAPI;
