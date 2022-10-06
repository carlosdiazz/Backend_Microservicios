import UserModel from "../components/user/users.model"
import boom from '@hapi/boom'

export const comprobarUser= async(id:string) => {
    const comprobar = await UserModel.findById(id)
    if(!comprobar){
        throw boom.badRequest('Este id no tiene un usuario asignado')
    }
}
