import {prop, getModelForClass, modelOptions,} from '@typegoose/typegoose'
import {Departamento_Users} from '../../libs/Enums'

@modelOptions({schemaOptions: {timestamps: true}})
export class User {

    @prop({required: true}) //Mongoose
    name: string      //TypeScript

    @prop({required: true, unique: true})
    cedula: string

    @prop({required: true, unique: true})
    id_anterior: string

    @prop({required: true, enum: Departamento_Users})
    departamento: Departamento_Users


}

const UserModel = getModelForClass(User)
export default UserModel