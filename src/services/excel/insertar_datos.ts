import XLSX from 'xlsx'
import {
    sacarFechasDelObject,
    comprobar_tandas,
    prepararJson,
    createRegistrosApi

} from './leer_excel'
import {TANDAS_ENUM_USERS, Registro} from '../../libs/Enums'

//?Con esta funcion saco del excel los datos
export const leerExcel = async(ruta: string) => {

    const libro = XLSX.readFile(ruta);
    const TodasHojas = libro.SheetNames;
    const hojaUna = TodasHojas[0]
    const dataExcel = XLSX.utils.sheet_to_json<Registro>(libro.Sheets[hojaUna])
    dataExcel.forEach(async(excelData) => {
        const arr_fechas = sacarFechasDelObject(excelData)
        const tanda_matutina = comprobar_tandas(arr_fechas, TANDAS_ENUM_USERS.MATUTINA)
        if(tanda_matutina){
            const data = await prepararJson(excelData, TANDAS_ENUM_USERS.MATUTINA, tanda_matutina)
            if(data){
                await createRegistrosApi(data)
            }
        }
        const tanda_vespertina = comprobar_tandas(arr_fechas, TANDAS_ENUM_USERS.VESPERTINA)
        if(tanda_vespertina){
            const data = await prepararJson(excelData, TANDAS_ENUM_USERS.VESPERTINA, tanda_vespertina)
            if(data){
                await createRegistrosApi(data)
            }
        }
    })
}

const ruta = './data.xlsx'
leerExcel(ruta)