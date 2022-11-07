//import XLSX from 'xlsx'
import {TANDAS_ENUM_USERS, HORARIO_ENUM} from '../../libs/Enums'
import axios,{AxiosError} from 'axios';
import {saberPorIdAnterior} from './libs/saber_usuario'
import {URL_API} from '../../config/config'

//? Con esta funcion sacos las fechas del objecto y las juntos en un arreglos
export const sacarFechasDelObject = (object: {}) => {
    let horas:Array<string> = []
    for (const key in object) {
        const value = object[key];
        if(!(Number.isNaN(Number(key))) && value && value !== '00:00'){
            horas.push(object[key])
        }
    }
    return horas
}

export const comprobar_tandas = (arr: Array<string>, tanda: TANDAS_ENUM_USERS) => {

    let hora_entrada;
    let hora_salida;

    if(tanda === TANDAS_ENUM_USERS.MATUTINA) {
        for(let i of arr){
            if(!hora_entrada){
                hora_entrada      = validar_hora(i, 7, 9)
            }
            if(!hora_salida){
                hora_salida      = validar_hora(i, 11,12 )
            }
        }
        if(!hora_salida && hora_entrada){
            hora_salida = "12:00"
        }
    }
    if(tanda === TANDAS_ENUM_USERS.VESPERTINA) {
        for(let i of arr){
            if(!hora_entrada){
                hora_entrada     = validar_hora(i, 13,15 )
            }
            if(!hora_salida){
                hora_salida      = validar_hora(i, 16, 20)
            }
        }
        if(!hora_salida && hora_entrada){
            hora_salida = "17:30"
        }
    }

    if(hora_entrada && hora_salida){
        return {
            'hora_entrada': hora_entrada,
            'hora_salida': hora_salida
        }
    }else{
        return false
    }
}

//? Con esta funcion voy a validar las hora que se van a registrar.. la comparo con un de inicio y una final
export const validar_hora = (hora_a_comprobar: string, rango_inicio: number, rango_salida: number) => {

    const hora_a_verificar = Number(hora_a_comprobar.slice(0,2))
    if(hora_a_verificar >= rango_inicio && hora_a_verificar <= rango_salida){
        return hora_a_comprobar
    }
    else{
        return false
    }
}

export const prepararJson = async(data: any, tanda: TANDAS_ENUM_USERS, horas_tandas: object, ) => {

    const newData       = {}
    const idData        = await saberPorIdAnterior(data['Work ID'])
    let hora_entrada    = horas_tandas[HORARIO_ENUM.HORA_ENTRADA]
    let hora_salida     = horas_tandas[HORARIO_ENUM.HORA_SALIDA]
    if (idData === false) {
        console.log(`ESTE ID NO EXISTE => ${data['Work ID']}`)
        return false
    }
    const tandas = {
        "tanda": tanda,
        "hora_entrada": data['Record date'] + " " +hora_entrada,
        "hora_salida" : data['Record date'] + " " +hora_salida,
    }
    newData["date"]     = data['Record date']
    newData['id_user']  = idData
    //newData['tanda']    = tanda
    newData['tandas']   = tandas

    return newData
}

export const createRegistrosApi = async(data: object) => {
   try{
       const url = `${URL_API}/api/v1/registro`
       await axios.post(url, data)
   }catch(error){
       if(error instanceof AxiosError){
           console.log(error.message)
           console.log(error.response?.data)
       }else{
        console.log('Error con la peticion Axios')
       }
   }
}