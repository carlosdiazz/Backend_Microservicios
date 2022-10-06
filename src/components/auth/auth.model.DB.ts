import {prop, getModelForClass, modelOptions} from '@typegoose/typegoose'
//import {encryptPassword} from '../../libs/cifrarContrasena'
//import {createUserTypeAdmin} from './auth.schemas'
@modelOptions({schemaOptions: {timestamps: true}})


//@pre<Auth>('save', async() => {
//    this.password = await encryptPassword()
//})

class Auth {
    @prop({required: true})
    name: string

    @prop({required:true, unique: true})
    nickname: string

    @prop({required: true, unique: true})
    email: string

    @prop({required: true})
    password: string

    @prop({required: true})
    is_staff: boolean

}


const authModel = getModelForClass(Auth)
export default authModel