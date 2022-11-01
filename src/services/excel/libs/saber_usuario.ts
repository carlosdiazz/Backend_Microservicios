import {URL_API} from '../../../config/config'
import axios,{AxiosError} from 'axios'

export const saberPorIdAnterior = async(data: string) => {
    try{
        const url = `${URL_API}/api/v1/registro/id_anterior/${data}`
        const user = await axios.get(url)
        return user.data?.data?._id
    }catch(error) {
        if(error instanceof AxiosError){
            console.log(error.message)
            console.log(error.response?.data)
            return false
        }else{
            console.log('Error en la peticion de saberUserId')
            return false
        }
    }
}