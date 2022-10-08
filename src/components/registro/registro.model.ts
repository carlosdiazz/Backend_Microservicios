import {prop, getModelForClass, modelOptions, Ref} from '@typegoose/typegoose'
import {User} from '../user/users.model'
import {Departamento_Users, TANDAS_ENUM_USERS} from '../../libs/Enums'

@modelOptions({schemaOptions: {timestamps: true}})
export class Registro {

    @prop({required: true}) //Mongoose
    date: Date      //TypeScript

    @prop({required: true, enum: TANDAS_ENUM_USERS})
    tanda: string

    @prop({required: true})
    hora_entrada: Date

    @prop({required: true})
    hora_salida: Date

    @prop({required: true})
    total_hora: number

    @prop({required: true, enum: Departamento_Users, ref: () => User })
    id_user: Ref<User>

}

const RegistroModel = getModelForClass(Registro)
export default RegistroModel

