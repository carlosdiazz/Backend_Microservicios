import { Router } from "express";
import {validarSchemas} from '../../libs/validarSchemas'
import * as registroSchema from './registro.schemas'
import * as registroService from './registro.service'

const registroRouter = Router()


registroRouter.get(
    '/',
    validarSchemas(registroSchema.getAllRegistro),
    registroService.getAllRegistro
)
registroRouter.get(
    '/id_anterior/:id_anterior',
    //validarSchemas(registroSchema.getOneRegistro),
    registroService.getIdOneRegistro
)

registroRouter.get(
    '/:id',
    validarSchemas(registroSchema.getOneRegistro),
    registroService.getOneRegistro
)

registroRouter.post(
    '/',
    validarSchemas(registroSchema.createOneRegistro),
    registroService.createRegistro
)

registroRouter.put(
    '/:id',
    validarSchemas(registroSchema.updateOneRegistro),
    registroService.actualizarRegistro
)

registroRouter.delete(
    '/:id',
    validarSchemas(registroSchema.getOneRegistro),
    registroService.deleteRegistro
)

export default registroRouter