import expres from 'express'
import routerApi from '../routes/index.routes'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import passport from 'passport'
import passportMiddleware from '../middlewares/passport'
//import swaggerJsDoc from 'swagger-jsdoc'
//import swaggerUI from 'swagger-ui-express'
//import {swagger} from '../swaggerOptions'

import * as errorHandle from '../libs/errorHandle'

const app = expres()

//Swagger
//const swaggerDocs = swaggerJsDoc(swagger)
//app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//Midellwares
app.use(expres.json())
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())

//Passport
app.use(passport.initialize())
passport.use(passportMiddleware)


//Rutas
routerApi(app)



//Middlewares de error
app.use(errorHandle.BoomErrorHandler)
app.use(errorHandle.jsonErrorHandler)
app.use(errorHandle.mongoErrorHandler)

app.use(errorHandle.errorResponse)

export default app;