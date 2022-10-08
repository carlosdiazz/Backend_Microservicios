import axios from 'axios'
import {URL_API} from '../../config/config'

const id_filter = '6340f8a489aa7aae94edc275'

const url_get = `${URL_API}/api/v1/registro`

const url_query = `${url_get}?id_user=${id_filter}`

const peticion = async() => {
    const prueba = await axios.get(url_query)
    return prueba.data.data
}

const convertir_data = async() => {
    let suma = 0
    const respuesta = await peticion()
    respuesta.forEach(data => {
        //console.log(data)
        suma += data?.total_hora
    })
    console.log(suma)
    return suma
}

convertir_data()