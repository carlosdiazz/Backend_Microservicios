import XLSX from 'xlsx'

//const saberIdUsuario = (id: string) => {
//
//    const numero = Number(id)
//    if(numero === 1){
//        return "634054f796407fd5e084417a"
//    }
//    return id
//
//}
//

//? Con esta funcion saco las fechas del objecto y la junto en un arreglo
const sacarFechasDelObject = (arreglo: object) => {

    let horas:Array<string> = []

    for(let i = 1 ; i < 8 ; i++ ) {
        if(arreglo[i] && arreglo[i] !== '00:00'){
            horas.push(arreglo[i])
        }
    }
    return horas
}

//const createRegistros = async(data) => {
//    try{
//        //console.log(data)
//        //console.log(JSON.stringify(data))
//        const url = 'http://localhost:4300/api/v1/registro'
//        const params = {
//            method : 'POST',
//            headers: {
//                "Content-Type": "application/json"
//            },
//            body: JSON.stringify(data)
//        }
//
//        const response = await fetch(url, params)
//        const result = await response.json()
//        if(result.statusCode !== 201){
//            throw Error(result.message)
//        }
//        console.log('Se mando bien')
//    }catch(err){
//        console.log(err)
//    }
//}


//const prepararJson = (data: object) => {
//
//    const newData = {}
//    const idData = saberIdUsuario(data['Work ID'])
//    let hora_entrada : string
//    let hora_salida : string
//
//    if(data['1'] === '00:00'){
//        hora_entrada = data['2']
//        hora_salida  = data['3']
//
//    }else{
//        hora_entrada = data['1']
//        hora_salida  = data['2']
//    }
//
//    newData['id_user'] = idData
//    newData['tanda'] = "MATUTINA"
//    newData['hora_entrada'] = new Date(data['Record date']+" "+hora_entrada)
//    newData['hora_salida'] = new Date(data['Record date']+" "+hora_salida)
//    newData['date'] = new Date(data['Record date'])
//    return newData
//}

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

const comprobar_tandas = (arr: Array<string>) => {

    let hora_inicio_matutino;
    let hora_final_matutitno;
    let hora_inicio_vesrpertino;
    let hora_final_vespertino;

    for(let i of arr){
        if(!hora_inicio_matutino){
            hora_inicio_matutino      = validar_hora(i, 7, 9)
        }

        if(!hora_final_matutitno){
            hora_final_matutitno      = validar_hora(i, 11,13 )
        }

        if(!hora_inicio_vesrpertino){
            hora_inicio_vesrpertino   = validar_hora(i, 13,15 )
        }

        if(!hora_final_vespertino){
            hora_final_vespertino     = validar_hora(i, 16, 20)
        }
    }

    if(!hora_final_matutitno && hora_inicio_matutino) {
        hora_final_matutitno="12:00"
    }

    if(!hora_final_vespertino && hora_inicio_vesrpertino){
        hora_final_vespertino="17:30"
    }

    console.log("hora_inicio_matutino    => ",hora_inicio_matutino)
    console.log("hora_final_matutitno    => ",hora_final_matutitno)
    console.log("hora_inicio_vesrpertino => ",hora_inicio_vesrpertino)
    console.log("hora_final_vespertino   => ",hora_final_vespertino)
}

//?Con esta funcion saco el excel de los datos
const leerExcel = async(ruta: string) => {
    try{
        const libro = XLSX.readFile(ruta);
        const TodasHojas = libro.SheetNames;
        const hojaUna = TodasHojas[0]
        const dataExcel = XLSX.utils.sheet_to_json(libro.Sheets[hojaUna])

        let json;

        dataExcel.forEach(async(data) => {
            //console.log(data)
            json = data as object
            //console.log(json)
            //console.log(prepararJson(json))
            const fechas = sacarFechasDelObject( json)
            console.log(fechas)
            comprobar_tandas(fechas)
            //console.log(fechas)
            //await createRegistros(prepararJson(json))
        })

    }catch(error){
        console.log('AQQU')
        console.log(error)
    }

}

const ruta = './probar.xlsx'

leerExcel(ruta)