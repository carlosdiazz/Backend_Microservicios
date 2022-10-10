import XLSX from 'xlsx'
import {TANDAS_ENUM_USERS, HORARIO_ENUM} from '../../libs/Enums'
import axios,{AxiosError} from 'axios';
import {saberIdUsuario} from '../libs/saber_usuario'
import {URL_API} from '../../config/config'
export interface Registro {
    id_user?:      string;
    tanda?:        string;
    date?:         Date;
    hora_entrada?: string;
    hora_salida?:  string;
}

const prepararJson = (data: any, tanda: TANDAS_ENUM_USERS, horas_tandas: object, ): Registro => {

    const newData       = {}
    const idData        = saberIdUsuario(data['Work ID'])
    let hora_entrada    = horas_tandas[HORARIO_ENUM.HORA_ENTRADA]
    let hora_salida     = horas_tandas[HORARIO_ENUM.HORA_SALIDA]

    newData['id_user']                  = idData
    newData['tanda']                    = tanda
    newData['date']                     = data['Record date']
    newData[HORARIO_ENUM.HORA_ENTRADA]  = data['Record date'] + " " +hora_entrada
    newData[HORARIO_ENUM.HORA_SALIDA]   = data['Record date'] + " " +hora_salida
    return newData
    // if(idData){
    // }
    // console.log('Algo malo en prepararJson')

}

//? Con esta funcion saco las fechas del objecto y la junto en un arreglo
const sacarFechasDelObject = (object: {}) => {

    let horas:Array<string> = []
    for (const key in object) {
        const value = object[key];
        if(!(Number.isNaN(Number(key))) && value && value !== '00:00'){
            horas.push(object[key])

        }
    }
// ((prop)=>{
//         if(arreglo[i] && arreglo[i] !== '00:00'){
//             horas.push(arreglo[i])
//         }
//     });
//     for(let i = 1 ; i < 8 ; i++ ) {
//         if(arreglo[i] && arreglo[i] !== '00:00'){
//             horas.push(arreglo[i])
//         }
//     }
    return horas
}

//? Con esta funcion voy a validar las hora que se van a registrar.. la comparo con un de inicio y una final
const validar_hora = (hora_a_comprobar: string, rango_inicio: number, rango_salida: number) => {

    const hora_a_verificar = Number(hora_a_comprobar.slice(0,2))
    if(hora_a_verificar >= rango_inicio && hora_a_verificar <= rango_salida){
        return hora_a_comprobar
    }
    else{
        return false
    }
}

const comprobar_tandas = (arr: Array<string>, tanda: TANDAS_ENUM_USERS) => {

    let hora_entrada;
    let hora_salida;

    if(tanda === TANDAS_ENUM_USERS.MATUTINA) {
        for(let i of arr){
            if(!hora_entrada){
                hora_entrada      = validar_hora(i, 7, 9)
            }
            if(!hora_salida){
                hora_salida      = validar_hora(i, 11,13 )
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

const createRegistrosApi = async(data: object) => {
   try{
       const url = `${URL_API}/api/v1/registro`
       await axios.post(url, data)
   }catch(error){
       if(error instanceof AxiosError){
           console.log(error.message)
           console.log(error.response?.data)
       }
       console.log('Error con la peticion Axios')
   }
}

//!Falta esto
//!Quede donde colcoar el try catch pppara evitar que se duplique el envio de dato
//!Crear una cola al momento que se envie un dato a guardar

//?Con esta funcion saco el excel de los datos
export const leerExcel = async(ruta: string) => {

    const libro = XLSX.readFile(ruta);
    const TodasHojas = libro.SheetNames;
    const hojaUna = TodasHojas[0]
    const dataExcel = XLSX.utils.sheet_to_json<Registro>(libro.Sheets[hojaUna])

    dataExcel.forEach(async(excelData) => {

        const arr_fechas = sacarFechasDelObject( excelData)
        const tanda_matutina = comprobar_tandas(arr_fechas, TANDAS_ENUM_USERS.MATUTINA)
        if(tanda_matutina){
            const data = prepararJson(excelData, TANDAS_ENUM_USERS.MATUTINA, tanda_matutina)

            if(data){
                await createRegistrosApi(data)
            }
        }
        const tanda_vespertina = comprobar_tandas(arr_fechas, TANDAS_ENUM_USERS.VESPERTINA)
        if(tanda_vespertina){
            const data = prepararJson(excelData, TANDAS_ENUM_USERS.VESPERTINA, tanda_vespertina)

            if(data){
                await createRegistrosApi(data)
            }
        }
    })
}

const ruta = './probar.xlsx'
leerExcel(ruta)
