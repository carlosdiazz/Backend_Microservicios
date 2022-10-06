import {prop, getModelForClass, modelOptions, Ref} from '@typegoose/typegoose'
import {User} from '../user/users.model'
import {Departamento_Users} from '../../libs/Enums'

@modelOptions({schemaOptions: {timestamps: true}})
export class Registro {

    @prop({required: true}) //Mongoose
    date: string      //TypeScript

    @prop({required: true, unique: true})
    horas: Array<string>

    @prop({required: true, enum: Departamento_Users, ref: () => User })
    id_user: Ref<User>

}

const RegistroModel = getModelForClass(Registro)
export default RegistroModel

